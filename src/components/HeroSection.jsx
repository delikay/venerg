import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroTopImage from "../assets/herobanner2.jpg";
import heroBottomImage from "../assets/about_solar.jpg";

const cardBaseClasses =
  "h-32 w-40 rounded-3xl object-cover shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:h-40 sm:w-48";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className="bg-[#ebebeb] px-6 pb-16 pt-10 sm:px-10 lg:px-14 lg:pb-20 lg:pt-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10">
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(3.6rem,13vw,30rem)] font-semibold leading-[0.88] tracking-wide text-[#0f3a33] lg:text-[clamp(4rem,15vw,35rem)]"
          >
            Clean
            <br />
            Energy
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 lg:flex-col lg:items-start lg:justify-start lg:gap-10 lg:pt-10"
          >
            <motion.img
              src={heroTopImage}
              alt="Solar panels under blue sky"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className={`${cardBaseClasses} -rotate-12 lg:ml-[-7rem]`}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 4.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
            />
            <motion.img
              src={heroBottomImage}
              alt="Solar farm from above"
              loading="eager"
              decoding="async"
              fetchPriority="low"
              className={`${cardBaseClasses} rotate-[24deg]`}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, 10, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
            />
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            variants={itemVariants}
            className="max-w-sm text-base leading-8 text-[#123830] sm:text-lg"
          >
            Switch to clean, renewable solar energy and start saving on
            electricity bills today.
          </motion.p>

          <motion.button
            variants={itemVariants}
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#153728] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0f2a20]"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Get Started
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
