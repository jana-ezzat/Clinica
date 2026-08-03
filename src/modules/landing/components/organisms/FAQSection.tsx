import { getTranslations } from "next-intl/server";
import Heading from "@/shared/components/atoms/Heading";
import AccordionItem from "../molecules/AccordionItem";


export default async function FAQSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section id="faq" className="ds-bg px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Heading title={t("heading")} subtitle={t("subheading")} />

        <div className="flex flex-col gap-4 mt-8">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
