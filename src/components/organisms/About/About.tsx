"use client";

import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";
import { CraftIcon, VisionIcon, HeartTechIcon } from "@/components/atoms/Icon";
import { TeamCard } from "@/components/molecules/TeamCard";
import { teamMembers } from "@/data/products";

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Mission Statement */}
        <div className="text-center mb-24">
          <AnimatedContainer animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full glass text-accent-magenta text-sm font-medium mb-6">
              Our Philosophy
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h2 className="display-lg mb-8">
              <span className="gradient-text">Design That</span>
              <br />
              <span className="text-foreground">Gives a Damn</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              We spent 200 hours on a button most teams ship in minutes. That&apos;s
              not inefficiency—that&apos;s obsessive craft. Every interaction,
              every pixel, every line of code is infused with intention.
            </p>
          </AnimatedContainer>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { value: "200+", label: "Hours per feature" },
              { value: "6", label: "Products in development" },
              { value: "∞", label: "Attention to detail" },
              { value: "1", label: "Mission: Make it magical" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <AnimatedContainer animation="fadeInUp" className="text-center mb-12">
            <h3 className="display-md">
              <span className="text-foreground">The Team Behind</span>{" "}
              <span className="gradient-text">The Magic</span>
            </h3>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((division, index) => (
              <TeamCard key={division.id} division={division} index={index} />
            ))}
          </div>
        </div>

        {/* Values */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: CraftIcon,
                title: "Uncompromising Craft",
                description:
                  "We show iteration counts, behind-the-scenes, and the messy middle. Real work, not polish.",
              },
              {
                Icon: VisionIcon,
                title: "Bold Vision",
                description:
                  "Provocative copy, clear opinions, no bland corporate speak. We say what we mean.",
              },
              {
                Icon: HeartTechIcon,
                title: "Human-First Tech",
                description:
                  "Emotional resonance meets technical excellence. Software that feels illegal to use—in the best way.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-accent-cyan mb-4 flex justify-center md:justify-start">
                  <value.Icon size={32} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
