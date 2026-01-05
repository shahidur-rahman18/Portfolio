import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Chandni transformed our vague requirements into a robust, scalable platform. Her attention to detail is unmatched and the delivery was flawless.",
      author: "Sarah Jenkins",
      position: "CTO at Nexus",
      initials: "SJ",
      gradient: "from-blue-400 to-primary"
    },
    {
      quote: "Working with her was a breeze. She understood our brand voice immediately and delivered a stunning UI that our users absolutely love.",
      author: "Mark Rivera",
      position: "Product Lead at Flow",
      initials: "MR",
      gradient: "from-purple-400 to-indigo-500"
    },
    {
      quote: "Exceptional problem-solving skills. She optimized our legacy codebase and improved performance by 40%, significantly boosting our SEO rankings.",
      author: "David Chen",
      position: "Senior Dev at BitScale",
      initials: "DC",
      gradient: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mb-16 px-0 sm:px-0">
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">Testimonials</h3>
          <h2 className="text-3xl font-bold text-foreground">Kind Words</h2>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-8 gap-4 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index}
            className="snap-center shrink-0 w-[85vw] sm:w-[350px] relative flex flex-col justify-between hover:shadow-primary/5 transition-all duration-300"
          >
            <CardContent className="p-6">
              <i className="fas fa-quote-right absolute top-6 right-6 text-6xl text-primary/5 dark:text-primary/10"></i>
              <p className="text-muted-foreground text-sm leading-relaxed italic mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-border pt-4 w-full">
                <Avatar className="w-10 h-10 ring-2 ring-background">
                  <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-bold text-sm`}>
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-tight">{testimonial.author}</h4>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;