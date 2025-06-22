import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ReviewsSection = (): JSX.Element => {
  // Review data for mapping
  const reviews = [
    {
      quote: "Fácil de reservar y excelente espacio",
      avatar: "/avatar-1.svg",
      name: "Name",
      description: "Description",
    },
    {
      quote: "Todo limpio y bien equipado",
      avatar: "/avatar-2.svg",
      name: "Name",
      description: "Description",
    },
    {
      quote: "Perfecto para reuniones",
      avatar: "/avatar.svg",
      name: "Name",
      description: "Description",
    },
  ];

  return (
    <section className="w-full py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-semibold text-4xl tracking-[-0.72px] font-['Inter',Helvetica] text-black mb-12">
          Reseñas
        </h2>

        <div className="flex flex-wrap gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="flex-1 min-w-[300px] border border-solid border-[#e6e6e6] rounded-xl"
            >
              <CardContent className="flex flex-col items-start gap-12 p-8">
                <p className="font-medium text-[13px] leading-[19.5px] font-['Inter',Helvetica] text-black mt-[-0.5px] w-full">
                  &quot;{review.quote}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <img
                    className="w-[45px] h-[45px] object-cover"
                    alt="Avatar"
                    src={review.avatar}
                  />

                  <div className="flex flex-col items-start gap-0.5">
                    <div className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] whitespace-nowrap [font-style:var(--small-text-font-style)]">
                      {review.name}
                    </div>

                    <div className="font-small-text font-[number:var(--small-text-font-weight)] text-[#828282] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] whitespace-nowrap [font-style:var(--small-text-font-style)]">
                      {review.description}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
