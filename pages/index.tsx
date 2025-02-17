import { useState } from "react";
import { format } from "date-fns";
import NewsList from "../components/NewsList";
import ShortCuts from "../components/ShortCuts";
import Weather from "../components/Weather";
import quotes from "../data/quotes";

const Dashboard1 = ({ weatherInfo }) => {
  const [quote] = useState<{ text: string; author: string }>(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  return (
    <div
      className="flex flex-col bg-gray-900 h-screen w-screen py-32 px-64"
      style={{ backgroundColor: "#2E3440" }}
    >
      <div className="mb-10">
        <h1 className="text-4xl text-gray-200">My Dashboard</h1>
      </div>

      <div className="space-x-8 flex flex-row">
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="space-x-4 flex flex-row">
            <div
              className="w-1/2 h-48 bg-gray-800 rounded-xl flex flex-col"
              style={{ backgroundColor: "#3B4252" }}
            >
              <p className="text-2xl m-auto text-center mb-2 font-light text-accent">
                {format(new Date(), "EEEE")}
              </p>
              <p className="text-2xl m-auto text-center font-bold mt-2 text-accent">
                {format(new Date(), "dd/MM/yyyy")}
              </p>
            </div>
            <div
              className="w-1/2 h-48 bg-gray-800 rounded-xl flex flex-col"
              style={{ backgroundColor: "#3B4252" }}
            >
              <Weather weatherInfo={weatherInfo} />
            </div>
          </div>
          <div
            className="w-full h-48 bg-gray-800 rounded-xl"
            style={{ backgroundColor: "#3B4252" }}
          ></div>
        </div>
        <div className="w-1/3">
          <NewsList />
        </div>
        <div className="w-1/3">
          <ShortCuts />
        </div>
      </div>
      <p className="mx-auto mb-0 leading-none font-medium text-2xl italic text-gray-400 mt-20">
        {quote?.text}
      </p>
      <p className="mx-auto leading-none text-lg font-light italic text-gray-600 mt-2">
        {quote?.author}
      </p>
    </div>
  );
};

export default Dashboard1;

export async function getServerSideProps(context: any) {
  const protocol: string = context.req.headers["x-forwarded-proto"] || "http";
  const baseURL: string = context.req
    ? `${protocol}://${context.req.headers.host}`
    : "";

  const rawWeatherInfo = await fetch(baseURL + "/api/weather");
  const weatherInfo = await rawWeatherInfo.json();

  return {
    props: {
      weatherInfo,
    },
  };
}
