import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car, ShieldCheck, Target, Users } from "lucide-react";

export default function About() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            About Our Rydex
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're dedicated to making urban transportation safer, quicker, and
            more dependable for riders, drivers, and administrators.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <Target className="h-7 w-7 text-primary" />
                <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                  Our Target
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The goal is to connect riders and drivers smoothly through
                technology, providing affordable and secure rides, while
                offering drivers flexible earning opportunities.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                  Our Vision
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To transform mobility in every city we operate, building a safe
                and sustainable ride ecosystem where technology improves daily
                travel.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        {/* Team & Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Users className="h-10 w-10 mx-auto text-primary mb-5" />
              <h4 className="text-lg font-semibold text-card-foreground mb-3 tracking-tight">
                Our Team
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                A team of engineers, designers, and innovators committed to
                solving real-world mobility challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Car className="h-10 w-10 mx-auto text-primary mb-5" />
              <h4 className="text-lg font-semibold text-card-foreground mb-3 tracking-tight">
                Rider & Driver First
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Each feature is crafted to provide value and convenience for
                riders and drivers, placing them at the core of our system.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <ShieldCheck className="h-10 w-10 mx-auto text-primary mb-5" />
              <h4 className="text-lg font-semibold text-card-foreground mb-3 tracking-tight">
                Safety & Trust
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                From SOS features to driver verification, safety and trust are
                embedded in every ride, every interaction, every time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
