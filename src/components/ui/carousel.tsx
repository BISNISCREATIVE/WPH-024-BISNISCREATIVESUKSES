"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="w-full">
      <div
        ref={ref}
        className={cn(
          "flex w-full",
          orientation === "vertical" && "flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        orientation === "horizontal"
          ? "w-full flex-shrink-0 flex-grow-0"
          : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev, api } = useCarousel()
  const [slideCount, setSlideCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    setSlideCount(api.slideNodes().length)
  }, [api])
  if (slideCount <= 1) return null
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "flex flex-row items-center justify-center gap-1 px-3 py-2 rounded-full border border-gray-300 bg-white text-gray-800 font-medium text-base shadow-none transition-colors duration-150 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-100 absolute left-2 bottom-0 md:static md:translate-y-0 z-20",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span>Previous</span>
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext, api } = useCarousel()
  const [slideCount, setSlideCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    setSlideCount(api.slideNodes().length)
  }, [api])
  if (slideCount <= 1) return null
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "flex flex-row items-center justify-center gap-1 px-3 py-2 rounded-full border border-gray-300 bg-white text-gray-800 font-medium text-base shadow-none transition-colors duration-150 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-100 absolute right-2 bottom-0 md:static md:translate-y-0 z-20",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <span>Next</span>
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselIndicators = () => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSlideCount(api.slideNodes().length);
    setSelectedIndex(api.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (slideCount <= 1) return null;

  // Pagination logic
  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    if (slideCount <= maxVisible) {
      for (let i = 0; i < slideCount; i++) {
        pages.push(i);
      }
    } else {
      if (selectedIndex < 3) {
        pages.push(0, 1, 2, 3, -1, slideCount - 1);
      } else if (selectedIndex > slideCount - 4) {
        pages.push(0, -1, slideCount - 4, slideCount - 3, slideCount - 2, slideCount - 1);
      } else {
        pages.push(0, -1, selectedIndex - 1, selectedIndex, selectedIndex + 1, -2, slideCount - 1);
      }
    }
    return pages;
  };

  const pages = renderPages();

  return (
    <div className="flex justify-center items-center gap-2 mt-6 md:mt-8 select-none absolute left-0 right-0 bottom-2 md:static z-10">
      <div className="flex items-center gap-2">
        {pages.map((idx, i) => {
          if (idx === -1 || idx === -2) {
            return (
              <span key={"ellipsis-" + i} className="w-8 h-8 flex items-center justify-center text-xl text-[#374151]">…</span>
            );
          }
          return (
            <button
              key={idx}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-none outline-none transition-colors duration-200 text-base font-semibold
                ${idx === selectedIndex ? "bg-blue-500 text-white" : "bg-gray-200 text-[#374151]"}
                focus:ring-2 focus:ring-blue-400`}
              aria-label={`Go to page ${idx + 1}`}
              onClick={() => api && api.scrollTo(idx)}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
}
