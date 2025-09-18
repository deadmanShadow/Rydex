import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Smartphone, UserCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Effortless Booking",
      description:
        "Book your ride in just a few taps, with transparent pricing and instant confirmations.",
      icon: Smartphone,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your ride in real time, from pickup to drop-off, for complete peace of mind.",
      icon: MapPin,
    },
    {
      title: "Verified Drivers",
      description:
        "All drivers are thoroughly vetted and verified to ensure safety and reliability.",
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-16 px-4 container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Rydex Features
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-col items-center">
              <feature.icon className="h-10 w-10 text-primary mb-3" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
