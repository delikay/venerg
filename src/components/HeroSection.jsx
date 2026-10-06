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
        <div className="relative mt-10 lg:mt-12">
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <div className="relative h-[420px] w-full max-w-[980px]">
              <motion.img
                src={heroTopImage}
                alt="Solar panels under blue sky"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className={`${cardBaseClasses} absolute left-[10%] top-[12%] -rotate-12`}
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
                className={`${cardBaseClasses} absolute right-[12%] top-[42%] rotate-[24deg]`}
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
            </div>
          </div>

          <div className="relative z-10 lg:max-w-[760px]">
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(3.6rem,13vw,30rem)] font-semibold leading-[0.88] tracking-wide text-[#0f3a33] lg:text-[clamp(4rem,15vw,35rem)]"
            >
              Reliable
              <br />
              Power
            </motion.h1>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#123830]/80">
            <span className="rounded-full border border-[#123830]/15 bg-white/70 px-3 py-2">Lagos-based</span>
            <span className="rounded-full border border-[#123830]/15 bg-white/70 px-3 py-2">Home & business</span>
            <span className="rounded-full border border-[#123830]/15 bg-white/70 px-3 py-2">Installation & support</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="/#contact"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#153728] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0f2a20]"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Request a free quote
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="tel:+2348144196054"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#123830]/20 bg-white/80 px-7 py-3.5 text-sm font-medium text-[#123830] transition-colors hover:bg-white"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Call now
            </motion.a>
          </motion.div>
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-8 text-[#123830] sm:text-lg"
        >
          Trusted solar, inverter, CCTV, and security solutions for homes and businesses across Lagos.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
