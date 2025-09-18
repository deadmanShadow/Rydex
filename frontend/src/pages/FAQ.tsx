import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

export default function Faq1({
  heading = "Frequently Asked Questions",
  items = [
    {
      id: "faq-1",
      question: "How do I book a ride?",
      answer:
        "Booking a ride is simple! Just enter your pickup and destination, confirm the fare, and you're ready to go.",
    },
    {
      id: "faq-2",
      question: "How are drivers verified?",
      answer:
        "All drivers undergo a thorough background check, including driving history and vehicle inspection, to ensure safety and reliability.",
    },
    {
      id: "faq-3",
      question: "What happens if I encounter an issue during my ride?",
      answer:
        "Our support team is available 24/7. You can contact us through the app for quick assistance in case of any issues during your ride.",
    },
    {
      id: "faq-4",
      question: "How can I track my ride in real time?",
      answer:
        "Once your ride is confirmed, you can track your driver’s location in real time through the app, ensuring you know exactly when they’ll arrive.",
    },
    {
      id: "faq-5",
      question: "Are the rides affordable?",
      answer:
        "Yes! We offer transparent pricing with upfront fare details. No hidden fees, so you know what to expect before you ride.",
    },
    {
      id: "faq-6",
      question: "Can I cancel a ride after booking?",
      answer:
        "You can cancel your ride anytime before the driver arrives, with a small cancellation fee if the driver is already en route.",
    },
    {
      id: "faq-7",
      question: "How do I become a driver?",
      answer:
        "To become a driver, simply sign up through the app, submit the necessary documents, and go through a vehicle inspection and background check.",
    },
  ],
}: Faq1Props) {
  return (
    <section className="py-8 px-4 container mx-auto">
      <div className="">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
