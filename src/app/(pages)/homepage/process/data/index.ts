export interface ProcessPhase {
  phase: string
  title: string
  description: string[]
}

export const processPhases: ProcessPhase[] = [
  {
    phase: 'PHASE 1',
    title: 'Pre Flight Inspection',
    description: [
      "Before we embark on this journey it's mandatory that we get to know each other first.",
      "We'll talk about our projects, ideas and strategies and ultimately see if we are the right fit.",
      "After we establish the connection we'll propose our services to you with multiple package options, depending on your needs.",
    ],
  },
  {
    phase: 'PHASE 2',
    title: 'Ready for liftoff',
    description: [
      "You were delighted to see that we're cool like that.",
      'We gave you options that fit the aesthetics and the budget you are working with.',
      "At this point we both agree it's time for us to start the journey and liftoff.",
    ],
  },
  {
    phase: 'PHASE 3',
    title: 'Flying high',
    description: [
      'Depending on the project scope, these flights can get looong, sometimes lasting for months.',
      "That's why we'll make sure to storm you with updates every day and answer all the questions your curious mind comes up with during that time.",
      'Enjoy your flight.',
    ],
  },
  {
    phase: 'PHASE 4',
    title: 'Course correction',
    description: [
      "This is something we don't do very often but it happens. And when it does, we will do our best to figure it out and turn the project in another direction.",
      'But, turning a plane the other way can sometimes demand more fuel, and not all destinations are reachable at that point.',
      "That's why we'll once again present you with multiple options so everyone feels comfortable proceeding with the journey.",
    ],
  },
  {
    phase: 'PHASE 5',
    title: 'Landing and handover',
    description: [
      'Congratulations!',
      'The destination has been reached. We are now in a place where you can choose to include us into another trip or continue your travels on your own.',
      "Either way, we'll be glad to have traveled with you so far and we'll be ready whenever you choose to fly with us again.",
      'Cheers!',
    ],
  },
]