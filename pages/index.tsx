import Header from "@/components/header";
import { Movie } from "@/typings";
import Thumbnail from "@/components/Thumbnail";
import Footer from "@/components/Footer";

interface Props {
  popular: Movie[];
}

const Home = ({ popular }: Props) => {
  return (
    <>
      <Header />
      <main className={` min-h-screen min-w-[100%] `}>
        {" "}
        <section className="sm:mt-[50px]">
          <Thumbnail />
        </section>
      </main>
      < Footer />
    </>
  );
};
export default Home;
