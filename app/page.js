import Header from "@/components/layout/Home/Header";
import Background from "@/components/layout/Home/Background";
import SolanaBox from "@/components/layout/Home/SolanaBox";
import Card from "@/components/layout/Home/Card";
import Features from "@/components/layout/Home/Features";
import Experience from "@/components/layout/Home/Experience";
import ToastHandler from "@/components/toast/toastHandler";
import CheckLogin from "@/components/layout/Login/CheckLogin";

export default function Home() {
  return (
    <>
      <Background />
      <Header />

      <main>
        <SolanaBox />
        <Card />
        <Features />
        <Experience />
      </main>
    </>
  );
}
