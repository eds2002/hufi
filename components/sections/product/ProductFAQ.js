/* This example requires Tailwind CSS v2.0+ */
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
]

export default function FAQ() {
  return (
    <div className="bg-primary1">
      <div className="mx-auto max-w-7xl divide-y-2 divide-secondary1 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary2">Frequently asked questions</h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg font-medium leading-6 text-primary2">{faq.question}</dt>
                <dd className="mt-2 text-base text-primary3">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
