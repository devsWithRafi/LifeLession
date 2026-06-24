import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Brain, ScrollText } from 'lucide-react';
import { GrGroup } from 'react-icons/gr';
import { BsStars } from 'react-icons/bs';

const WhyLearningSection = () => {
  const data = [
    {
      title: 'Reflection',
      subtitle:
        'Converting raw events into lasting lessons through intentional thought.',
      icon: <Brain className="size-8" />,
    },
    {
      title: 'Community',
      subtitle:
        "Gaining years of insight in minutes by learning from others' paths.",
      icon: <GrGroup className="size-8" />,
    },
    {
      title: 'Legacy',
      subtitle:
        "Ensuring your hard-won insights aren't lost to the passage of time.",
      icon: <ScrollText className="size-8" />,
    },
    {
      title: 'Clarity',
      subtitle:
        'Gaining a clearer perspective on your own narrative and future goals.',
      icon: <BsStars className="size-8" />,
    },
  ];

  return (
    <section className="w-full px-5 py-30 bg-card/40">
      <div className="w-full max-w-375 mx-auto ">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-boldonse text-3xl text-center">
            Why Learning From Life Matters
          </h2>
          <p className="text-sm text-muted-foreground font-medium md:max-w-1/2 text-center mt-2">
            Knowledge is gathered from books, but wisdom is harvested from
            living. Here’s why we believe in documenting the journey.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-15">
          {data.map((d, i) => (
            <Card key={i} className="py-15">
              <CardHeader className="flex items-center justify-center">
                <span className="p-5 rounded-full bg-muted text-muted-foreground">
                  {d.icon}
                </span>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center">
                <CardTitle className="text-xl font-semibold">
                  {d.title}
                </CardTitle>
                <CardDescription>{d.subtitle}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningSection;
