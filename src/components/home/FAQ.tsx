"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQ() {
  const faqItems = [
    {
      question: "What do I need to rent a car?",
      answer:
        "To rent a car, you'll need a valid driver's license, a credit card in your name, and proof of insurance. International renters may need additional documentation. The minimum age requirement is typically 18, but may vary depending on the vehicle type.",
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer:
        "Yes, you can modify or cancel your reservation through contacting us.",
    },
    {
      question: "Is insurance included in the rental price?",
      answer:
        "Basic insurance is included in the rental price, but we offer additional coverage options for complete peace of mind. You can add these coverages during the booking process or at the rental counter.",
    },
    {
      question: "What is your fuel policy?",
      answer:
        "Our standard policy is \"full-to-full,\" which means you'll receive the car with a full tank and are expected to return it with a full tank. If you return the car with less fuel than when you received it, you'll be charged for refueling at a premium rate.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about our rental process, policies,
            and services.
          </p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-neutral-200 rounded-md overflow-hidden"
              >
                <AccordionTrigger className="flex justify-between items-center w-full bg-neutral-50 px-4 py-3 text-left focus:outline-none text-lg font-medium text-neutral-800">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-white text-neutral-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">
            Still have questions? Contact our customer support team.
          </p>
          <Link href="/contact-us">
            <Button className="bg-primary hover:cursor-pointer">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
