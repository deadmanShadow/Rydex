import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rashid Khan",
    role: "Project Manager",
    content:
      "Rydex has completely transformed my daily commute. It's fast, affordable, and I always feel safe during my ride.",
    initials: "RK",
  },
  {
    name: "Sara Alam",
    role: "Software Engineer",
    content:
      "I love how easy it is to book a ride. The real-time tracking and reliable drivers make every journey smooth and stress-free.",
    initials: "SA",
  },
  {
    name: "Imran Hossain",
    role: "DevOps Engineer",
    content:
      "Rydex is my go-to for business trips. Transparent pricing, great support, and punctual drivers make it a top choice.",
    initials: "IH",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm text-muted-foreground bg-background">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Loved by Riders</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 mb-2">
            Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Genuine stories from those who trust Rydex for their daily journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="h-full border">
              <CardContent className="p-6 flex flex-col gap-4">
                <p className="text-foreground/90 leading-relaxed">
                  “{t.content}”
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
