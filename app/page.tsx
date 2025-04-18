"use client";
import { StarField } from "@/components/star-field";
import {
  ChevronDown,
  Linkedin,
  Users,
  Github,
  LineChart,
  Clock,
  Lightbulb,
  BotIcon as Robot,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ChatbotModal } from "@/components/chatbot-modal";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [initialHeight, setInitialHeight] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const lastScrollRef = useRef(0);
  const ticking = useRef(false);

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight);
    }
  }, [initialHeight]);

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position
      scrollRef.current = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Calculate blur based on scroll position
          // Reduced max blur from 20px to 8px for a more subtle effect
          const maxBlur = 8;
          // Increased trigger height to make the effect develop more slowly
          const triggerHeight = initialHeight * 1.2;
          const newBlurAmount = Math.min(
            maxBlur,
            (scrollRef.current / triggerHeight) * maxBlur
          );

          setBlurAmount(newBlurAmount);

          // Update last scroll position for next comparison
          lastScrollRef.current = scrollRef.current;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialHeight]);

  // Intersection observer for visibility
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          // Once visible, no need to observe anymore
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          // Once visible, no need to observe anymore
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current);
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
          // Once visible, no need to observe anymore
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current);
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true);
          // Once visible, no need to observe anymore
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current);
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current);
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current);
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current);
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current);
      }
    };
  }, []);

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16; // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  };

  // Scroll to about section
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Scroll to contact section
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Open chatbot modal
  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  // Close chatbot modal
  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  };

  return (
    <div className="min-h-screen">
      <section
        className="relative w-full overflow-hidden bg-black"
        style={heroStyle}
      >
        {/* Navigation links in top right corner */}
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <a
            href="https://www.linkedin.com/in/ravindu-s-hemachandra-ba750425a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <a
            href="https://github.com/RavvyS/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://medium.com/@ravindusdc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Contact
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                Ravindu S Hemachandra{" "}
                <span role="img" aria-label="rocket">
                  🚀
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Full stack Developer | Data Engineer | Data Analytics
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                About
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Scroll to about section"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout();
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section
        ref={aboutSectionRef}
        id="about"
        className="py-20 bg-gradient-to-b from-black to-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-700 flex-shrink-0">
                <img
                  src="https://auywayc9wlk0qvk2.public.blob.vercel-storage.com/file-BaXiIMwT4zcH7SZIKu4FnAmqRQglyH.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-center md:text-left px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">About</h2>
                <div className="space-y-4 max-w-2xl">
                  <p className="text-gray-300">
                    I am an undergraduate Data Science student at SLIIT.
                  </p>
                  <p className="text-gray-300">
                    I am passionate about the field of data engineering and
                    eager to gain real-world experience by contributing to your
                    company’s innovative projects while learning from industry
                    experts.{" "}
                  </p>
                  <p className="text-gray-300">
                    And also , I'm a quick learner, and I'm an adaptable person,
                    and I'm a good team player.If you are interested, send me an
                    email. We can connect !!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[140px] mx-auto sm:mx-0"
                    >
                      Get in Touch
                    </Button>
                    {/* <Button
                      onClick={openChatbot}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[140px] mx-auto sm:mx-0 flex items-center justify-center"
                    >
                      <Robot className="mr-1 h-4 w-4" />
                      Chatbot
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={servicesSectionRef}
        id="services"
        className="py-20 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Projects
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Fractional CPO */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Users
                    className="h-7 w-7 text-white mr-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading">
                    Weather Prediction Using Ridge Regression (Completed)
                  </h3>
                </div>
                <p className="text-gray-300">
                  Technologies used: Python, Pandas, Scikit-Learn, JupyterLab,
                  Matplotlib
                </p>
                <p className="text-gray-300">
                  Built a machine learning model to predict the next day’s
                  maximum temperature using historical weather data from NOAA
                  (1970-present). Applied Ridge regression for predictive
                  modeling and implemented feature engineering techniques to
                  improve accuracy.
                </p>
              </div>

              {/* Product Consulting */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <LineChart
                    className="h-7 w-7 text-white mr-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading">
                    ETL Pipeline for Weather Data Analysis (Completed)
                  </h3>
                </div>
                <p className="text-gray-300">
                  Technologies used: Python, PostgreSQL, Pandas, Requests,
                  SQLAlchemy​
                </p>
                <p className="text-gray-300">
                  Project Overview: Developed a robust ETL (Extract, Transform,
                  Load) pipeline to automate the collection and processing of
                  weather data from public APIs, storing it in a PostgreSQL
                  database for comprehensive analysis.​
                </p>
              </div>

              {/* Interim Leadership */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Clock
                    className="h-7 w-7 text-white mr-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading">
                    Online Vehicle Service and Fuel Station Management System
                  </h3>
                </div>
                <p className="text-gray-300">
                  Technologies used: Java/JavaScript/MySQL/HTML/CSS Developed a
                  Fuel Station and Service Management System to optimize fuel
                  distribution and streamline vehicle service operations.
                </p>
              </div>

              {/* Workshops & Advisory */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Lightbulb
                    className="h-7 w-7 text-white mr-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading">
                    Employee Management System (Ongoing)
                  </h3>
                </div>
                <p className="text-gray-300">
                  Technologies used: React JS, Tailwind CSS, Express, MongoDB,
                  Shadcn UI, Bootstrap
                </p>
                <p className="text-gray-300">
                  Building the WorkSync platform streamlines employee
                  management, enhances task tracking, automates onboarding and
                  offboarding, and improves overall operational efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={contactSectionRef}
        id="contact"
        className="bg-gray-100 py-16"
      >
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isHeadingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Let's Build
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  );
}
