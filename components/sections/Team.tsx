import React from 'react';
import Image from 'next/image';
import { Section, SectionHeading } from '../shared/Section';
import { Reveal } from '../shared/Reveal';
import { TEAM, type TeamMember } from '../../constants/site';

function MemberCard({ member }: {member: TeamMember;}) {
  const alt = `${member.name}, ${member.role}`;
  const isIllustration = member.photo.endsWith('.svg');

  return (
    <figure className="group h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="relative aspect-square overflow-hidden rounded-tr-[2.5rem] sm:rounded-tr-[3.5rem]" style={{ background: member.bg }}>
        {isIllustration ?
        // Illustrated avatar: sits on the coloured background, anchored to the bottom edge.
        <Image
          src={member.photo}
          alt={alt}
          width={280}
          height={280}
          unoptimized
          className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2 transition-transform duration-500 ease-out group-hover:scale-105" /> :

        <Image
          src={member.photo}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-105" />
        }
      </div>
      <figcaption className="px-4 py-4 sm:px-6 sm:py-5">
        <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{member.name}</h3>
        <p className="mt-1 text-xs text-muted sm:text-sm">{member.role}</p>
      </figcaption>
    </figure>);

}

export function Team() {
  return (
    <Section id="team" className="scroll-mt-24 pt-0">
      <SectionHeading
        eyebrow="The team"
        title="Senior people, hands on keyboards"
        subtitle="No account managers between you and the people doing the work." />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {TEAM.map((m, i) =>
        <Reveal key={m.name} delay={i % 3 * 0.06} className="h-full">
            <MemberCard member={m} />
          </Reveal>
        )}
      </div>
    </Section>);

}
