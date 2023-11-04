import { CardHeader, Typography } from '@material-tailwind/react';

const TransactionHead = () => {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none bg-black"
    >
      <div className=" flex flex-col justify-between gap-8 pb-1">
        <div>
          <h3 className="text-primary-white font-bold mb-1 text-xl">
            Cash Out Transactions
          </h3>

          <p className="font-normal text-primary-white/60">
            These are details about the last transactions
          </p>
        </div>
      </div>
    </CardHeader>
  );
};
export default TransactionHead;
