'use client';
import { setHistory, setWeekStat } from '@/redux/graphSlice';
import fetch from 'cross-fetch';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useLiveGraph() {
  const [wsHistoryClient, setWsHistoryClient] = useState(null);
  const dispatch = useDispatch();

  const FetchHistory = async (interval) => {
    if (wsHistoryClient) wsHistoryClient.close();

    const client = new WebSocket('wss://ws-api.binance.com:443/ws-api/v3');

    client.onopen = function () {
      console.log('WebSocket Client Connected');
      client.send(
        JSON.stringify({
          id: '1dbbeb56-8eea-466a-8f6e-86bdcfa2fc0b',
          method: 'klines',
          params: {
            symbol: 'SOLUSDT',
            interval: interval.toString(),
            limit: 25,
          },
        })
      );
    };

    client.onmessage = function (e) {
      if (typeof e.data === 'string') {
        const result = JSON.parse(e.data).result;

        const data = result.map((item) => {
          return {
            ticker: Number(item[1]).toFixed(2),
            date:
              new Date(item[0]).getDate() +
              '/' +
              new Date(item[0]).getMonth() +
              '/' +
              new Date(item[0]).getFullYear(),
            time: new Date(item[0]).toLocaleTimeString(),
          };
        });
        dispatch(setHistory(data));
      }

      setTimeout(function timeout() {
        client.send(
          JSON.stringify({
            id: '1dbbeb56-8eea-466a-8f6e-86bdcfa2fc0b',
            method: 'klines',
            params: {
              symbol: 'SOLUSDT',
              interval: interval.toString(),
              limit: 25,
            },
          })
        );
      }, 60000);
    };

    client.onclose = function () {
      console.log('WebSocket Client Closed');
    };

    setWsHistoryClient(client);
  };

  const FetchWeekHistory = async () => {
    const price = await (
      await fetch(
        'https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1d&limit=7'
      )
    ).json();

    const priceData = price.map((item) => {
      return {
        ticker: Number(item[1]).toFixed(2),
      };
    });

    dispatch(setWeekStat(priceData));
  };

  return {
    FetchHistory,
    FetchWeekHistory,
  };
}
