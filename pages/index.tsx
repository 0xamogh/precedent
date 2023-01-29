import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import priceData from "../public/data.json"
import Popover from "@/components/shared/popover";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
export default function Home() {
  const [openPopover, setOpenPopover] = useState(false);
  const [popoverTitle, setPopoverTitle] = useState("popover")
  return (
    <Layout>
      {/* <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      > */}

        {/* <motion.h1
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        > */}
          <Balancer           className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]">How much would you have made?</Balancer>
        {/* </motion.h1> */}
        {/* <motion.p
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        > */}
          <Balancer           className="mt-6 text-center text-gray-500 md:text-xl z-10">
          If you had consistently dollar-cost-averaged in the bear market
          </Balancer>
        {/* </motion.p> */}
      <p
      className="text-black text-center font-display font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
      >
        {calculateProfit(100,ethPriceData,1).toFixed(2)}%
      </p>
      <div className="flex flex-row">        
        <p className="text-black z-10">Is what you would have earned, if you spent</p>
      <Popover
        className="z-10 px-2 -py-3"
        content={
          <div className="w-full rounded-md bg-red p-2 sm:w-40">
            <button 
            onClick={() => setPopoverTitle("Item1")}
            className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              Item 1
            </button>
            <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              Item 2
            </button>
            <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              Item 3
            </button>
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex w-40 items-center justify-between z-50 rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        >
          <p className="text-gray-600 z-50">{popoverTitle}</p>
          <ChevronDown
            className={`h-4 w-4 text-gray-600 transition-all z-50 ${
              openPopover ? "rotate-180" : ""
            }`}
          />
        </button>
      </Popover>
              <p className="text-black z-10">Is what you would have earned, if you spent</p>
</div>
      {/* </motion.div> */}
    </Layout>
  );
}

const ethPriceData = priceData

function calculateProfit(investmentAmount: number, ethPriceData: {date: string, price:number}[], investmentFrequency : number = 1, startDate = new Date("2022-1-1")) {
  let totalInvestment = 0;
  let totalEth = 0;
  let daysPassed = 0;
  
  for (let i = 0; i < ethPriceData.length; i++) {
    const date = new Date(ethPriceData[i].date);
    
    if (date < startDate) {
      continue;
    }

    daysPassed++;

    if (daysPassed % investmentFrequency === 0) {
      totalInvestment += investmentAmount;
      totalEth += investmentAmount / ethPriceData[i].price;
    }
  }

  const totalProfit = (((totalEth * ethPriceData[ethPriceData.length - 1].price) - totalInvestment)/totalInvestment)*100;

  return totalProfit;
}