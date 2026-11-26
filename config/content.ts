/** Flip to true once real tracks or links are added to content.projects. Hides the Projects page from nav, footer and home while false. */
export const showProjects = false;

export const content = {
  name: "Michael Hong",
  tagline: "Cal Poly Business & Music student passionate about music technology.",
  degreeSummary: "Business Administration major (Information Systems) with a Music minor at Cal Poly.",
  location: "San Francisco Bay Area",
  email: "michaelhonggsq@gmail.com",
  linkedin: "https://www.linkedin.com/in/michaelhong170/",
  instagram: "https://www.instagram.com/michael.honggg/",

  /** Home page hero: the line shown above your name (also used on the link-preview image). */
  hero: {
    eyebrow: "Business + Information Systems @ Cal Poly · Class of 2027",
  },

  about: {
    bio: "My name is Michael Hong and I'm a fourth year business student at Cal Poly! I'm from Dublin, California (Bay Area) and I'd love to work in the music industry when I'm older, more specifically music technology. Most recently I interned at Protiviti in San Francisco as a technology consulting intern, and in my free time I like to go to the gym, play music, and go on spontaneous adventures!",
    highlights: [
      "3.88 GPA, Dean's List 9x, President's List 3x",
      "Former Technology Consulting Intern at Protiviti",
      "Interests in music, calisthenics, and spontaneous adventures",
    ],
    /** Shorter versions for the home page "A Bit About Me" section. The About page uses bio and highlights above. */
    homeBio: "I'm a fourth year Business Administration student at Cal Poly from Dublin, California, studying Information Systems with a minor in Music. I want to build a career in music technology, and outside of class you'll find me at the gym, playing music, or on a spontaneous adventure.",
    homeHighlights: [
      "3.88 GPA, Dean's List 9x, President's List 3x",
      "2025-26 All-Alpha Kappa Psi Academic Team: Team Captain",
      "Graduating June 2027 with a B.S. in Business Administration",
    ],
  },

  /**
   * Home page hero "Featured Work" grid. Each item points at an experience or leadership
   * entry by its exact title + org (logo and stats come from that entry).
   * Shown as a 2x2 grid beside the hero. Keep blurbs to one sentence of similar length (about 80-90 characters) so tiles line up.
   */
  featured: [
    {
      title: "Technology Consulting Intern",
      org: "Protiviti",
      blurb: "Assessed cybersecurity policies against CIS Controls for a pre-IPO semiconductor company.",
    },
    {
      title: "Marketing Strategy Consulting Intern",
      org: "Tifa Chocolate & Gelato",
      blurb: "Ran Instagram strategy and AI-assisted video production for a local dessert shop.",
    },
    {
      title: "President",
      org: "Orfalea College of Business Student Ambassadors",
      blurb: "Lead the 32-member team that represents the business college to prospective students and families.",
    },
    {
      title: "Executive Vice-President",
      org: "Alpha Kappa Psi Business Fraternity",
      blurb: "Led the executive board running professional and philanthropic programs for the chapter.",
    },
  ],

  education: [
    {
      school: "California Polytechnic State University",
      location: "San Luis Obispo, CA",
      degree: "B.S. Business Administration: Information Systems | Minor: Music",
      dates: "Sept. 2023 – May 2027",
      logo: "/logos/calpoly.jpeg",
      stats: [
        { value: "3.88", label: "GPA" },
        { value: "9x", label: "Dean's List" },
        { value: "3x", label: "President's List" },
      ],
      bullets: [
        "GPA: 3.88",
        "Honors: Dean's List 9x, President's List 3x, 2025-26 All-Alpha Kappa Psi Academic Team: Team Captain",
        "Relevant Coursework: Database Systems in Business (SQL), Project Management, Business Application Development",
      ],
    },
  ],

  // Listed newest first. Entries with the same company/org are grouped LinkedIn-style on the
  // Experience page (in the order they appear here). logo: "" shows the org's initials instead.
  experience: [
    {
      title: "Technology Consulting Intern",
      company: "Protiviti",
      location: "San Francisco, CA",
      dates: "Jun. 2026 – Aug. 2026",
      logo: "/logos/protiviti.jpeg",
      photos: [] as string[],
      stats: [
        { value: "10", label: "Policies Assessed" },
        { value: "18", label: "CIS Controls" },
        { value: "5+", label: "Workstreams" },
      ],
      bullets: [
        "Assessed 10 cybersecurity policies against 18 CIS Controls to support IPO readiness for a semiconductor company",
        "Coordinated IPO-readiness activities across 5+ workstreams spanning cybersecurity, SOX, ERP, BCM, and governance",
        "Produced executive-ready cybersecurity and governance deliverables for stakeholders supporting a pre-IPO transformation",
      ],
    },
    {
      title: "Student Ambassador",
      company: "Adobe",
      location: "San Luis Obispo, CA",
      dates: "May 2026 – Present",
      logo: "/logos/adobe.jpeg",
      photos: [] as string[],
      stats: [],
      bullets: [] as string[],
    },
    {
      title: "Career Peer Advisor",
      company: "Orfalea College of Business",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2026 – Present",
      logo: "/logos/ocob.jpeg",
      photos: [] as string[],
      stats: [
        { value: "30+", label: "Students/Month" },
      ],
      bullets: [
        "Assist 30+ students/month with resume/cover letter editing, job/internship search, networking, & (case) interviews",
        "Manage, update, and direct students to resource listing opportunities seeking students from diverse backgrounds",
        "Collaborate with 2+ managers, 5+ staff members, and 5+ clubs to increase outreach & awareness of center's resources",
      ],
    },
    {
      title: "Marketing Strategy Consulting Intern",
      company: "Tifa Chocolate & Gelato",
      location: "Walnut Creek, CA",
      dates: "Feb. 2026 – Aug. 2026",
      logo: "/logos/tifa.jpeg",
      photos: [] as string[],
      stats: [
        { value: "138K+", label: "Total Views" },
        { value: "65K+", label: "Unique Accounts" },
        { value: "38%", label: "Follower Growth" },
      ],
      bullets: [
        "Generated 138K+ views and reached 65,000+ unique accounts on Instagram over a five-month period",
        "Synthesized Meta Business Suite analytics into weekly reports, informing content decisions behind 38% follower growth",
        "Produced video content end-to-end using Claude AI for scripting and editing, cutting production time per video by 67%",
      ],
    },
    {
      title: "Peer Mentor",
      company: "Orfalea College of Business",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2024 – Jun. 2026",
      logo: "/logos/ocob.jpeg",
      photos: [] as string[],
      stats: [
        { value: "4", label: "Students Mentored" },
        { value: "80+", label: "OCOB Students" },
      ],
      bullets: [
        "Mentored four students throughout the academic year through motivational interviewing, supporting personal growth",
        "Collaborated with 80+ students in OCOB student services to provide resources and opportunities to mentees",
        "Analyzed student feedback and academic progress to tailor mentoring strategies and improve outcomes",
      ],
    },
    {
      title: "Recruitment Ambassador",
      company: "Cal Poly Admissions",
      location: "San Luis Obispo, CA",
      dates: "Sept. 2025 – Mar. 2026",
      logo: "/logos/calpoly.jpeg",
      photos: [] as string[],
      stats: [
        { value: "60+", label: "Members Coordinated" },
      ],
      bullets: [
        "Executed large-scale recruitment events with admissions staff, supporting diversity, equity, and inclusion initiatives",
        "Coordinated 60+ members in the Mustang Mentorship Program, coordinating bi-monthly meetings and quarterly events",
        "Utilized Slate to verify thousands of forms and streamline digital workflows for on-campus events",
      ],
    },
    {
      title: "Campus Growth Director",
      company: "Leland",
      location: "San Luis Obispo, CA",
      dates: "Sept. 2025 – Dec. 2025",
      logo: "/logos/leland.png",
      photos: [] as string[],
      stats: [
        { value: "#1", label: "of 120+ Ambassadors" },
        { value: "250", label: "Signups Driven" },
        { value: "12+", label: "Ambassadors Led" },
      ],
      bullets: [
        "Directed 12+ ambassadors to drive 250 Leland+ signups, unlocking $7.6M in resources for 22,000 Cal Poly undergrads",
        "Ranked 1st among 120+ ambassadors nationwide for student org partnerships and recruiting during a two-week sprint",
        "Analyzed student engagement data to recommend growth initiatives, informing Leland's campus expansion strategy",
      ],
    },
    {
      title: "Social Lead Ambassador",
      company: "Acorns",
      location: "San Luis Obispo, CA",
      dates: "Sept. 2025 – Dec. 2025",
      logo: "/logos/acorns.jpeg",
      photos: [] as string[],
      stats: [
        { value: "600+", label: "User Clickthroughs" },
      ],
      bullets: [
        "Managed on-campus marketing events promoting financial literacy tools, securing 600+ new user clickthroughs",
        "Identified high-traffic event locations and coordinated tabling logistics to educate students on platform benefits",
        "Partnered with on-campus organizations, including DoorDash, to amplify outreach through joint tabling events",
      ],
    },
    {
      title: "Campus Events Launcher",
      company: "DoorDash",
      location: "San Luis Obispo, CA",
      dates: "Aug. 2024 – Dec. 2025",
      logo: "/logos/doordash.jpeg",
      photos: [] as string[],
      stats: [
        { value: "2,200+", label: "DashPass Signups" },
        { value: "40+", label: "Events Executed" },
        { value: "$10k+", label: "Market Share" },
      ],
      bullets: [
        "Executed 40+ campus events, driving 2,200+ Student DashPass signups and increasing market share by over $10K",
        "Built and maintained ongoing partnerships with 7+ student organizations, growing external signups by 12%",
        "Maintained a cost per sale under $10 while tabling, ranking top 3 of 25+ schools in the bracket for signups",
      ],
    },
    {
      title: "Area Manager Intern",
      company: "Amazon",
      location: "Tracy, CA",
      dates: "Jun. 2025 – Aug. 2025",
      logo: "/logos/amazon.jpeg",
      photos: [] as string[],
      stats: [
        { value: "110+", label: "Associates" },
        { value: "1,500+", label: "Items Packed/Day" },
      ],
      bullets: [
        "Oversaw operations of 110+ associates in AFE1, maintaining individual productivity of 1,500+ items packed daily",
        "Redesigned a box-selection chart to cut mis-sized packaging errors, occurring in 1 of every 90 boxes",
        "Presented process improvement recommendations to senior operations managers, securing approval for warehouse adoption",
      ],
    },
    {
      title: "Program Director",
      company: "Skyhawks Sports Academy",
      location: "Pleasanton, CA",
      dates: "Jun. 2022 – Aug. 2024",
      logo: "/logos/skyhawks.jpeg",
      photos: [] as string[],
      stats: [
        { value: "30+", label: "Campers Managed" },
      ],
      bullets: [
        "Managed daily game plans, activities, and lessons for 30+ campers aged 6-12, collaborating with assistant coaches",
        "Fostered an engaging learning environment by teaching fundamentals for major sports including basketball and track",
        "Maintained effective communication with managers, head, and assistant coaches while adjusting to unknown circumstances",
      ],
    },
  ],

  leadership: [
    {
      title: "President",
      org: "Orfalea College of Business Student Ambassadors",
      location: "San Luis Obispo, CA",
      dates: "May 2026 – Present",
      logo: "/logos/ocob.jpeg",
      stats: [
        { value: "32", label: "Ambassadors" },
        { value: "1,000+", label: "Tour Guests" },
        { value: "3,000+", label: "Students Represented" },
      ],
      bullets: [
        "Selected as 1 of 32 students to lead OCOB's external-facing student leadership group, representing 3,000+ students",
        "Synthesized feedback from 1,000+ prospective student tours annually to iteratively improve program effectiveness",
        "Directed weekly meetings across eight committees, liaising with the Dean's Office to align stakeholders and drive execution",
      ],
    },
    {
      title: "VP of Visitor Experience",
      org: "Orfalea College of Business Student Ambassadors",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2025 – May 2026",
      logo: "/logos/ocob.jpeg",
      stats: [
        { value: "1,000+", label: "Prospective Students" },
      ],
      bullets: [
        "Managed on-campus and virtual tours for 1,000+ prospective students using Slate, Outlook, and Gmail",
        "Led K-12 outreach, updated tour materials, and coordinated with the Welcome Center and Dean's Office for VIP visits",
        "Collected visitor feedback and reported insights to leadership to enhance visitor content and overall experience",
      ],
    },
    {
      title: "Student Ambassador",
      org: "Orfalea College of Business Student Ambassadors",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2024 – Present",
      logo: "/logos/ocob.jpeg",
      stats: [
        { value: "32", label: "Ambassadors" },
        { value: "3,000+", label: "Students Represented" },
      ],
      bullets: [] as string[],
    },
    {
      title: "Active Member",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Oct. 2023 – Present",
      logo: "/logos/akpsi.jpeg",
      stats: [],
      bullets: [] as string[],
    },
    {
      title: "Executive Vice-President",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2025 – Mar. 2026",
      logo: "/logos/akpsi.jpeg",
      stats: [
        { value: "80+", label: "Members" },
        { value: "$10K", label: "Quarterly Budget" },
        { value: "17+", label: "Exec Board Members" },
      ],
      bullets: [
        "Led executive board (17+ members) in executing professional and philanthropic initiatives for 80+ members",
        "Managed a $10K quarterly budget and provided data-driven recommendations supporting organizational strategy",
        "Standardized internal systems and led transition to Billhighway, reducing fraud risk for dues and member payments",
      ],
    },
    {
      title: "Pledge Educator",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Sept. 2025 – Dec. 2025",
      logo: "/logos/akpsi.jpeg",
      stats: [
        { value: "16", label: "Pledges Educated" },
        { value: "5", label: "Week Curriculum" },
      ],
      bullets: [
        "Educated a 16-member pledge class on AKPsi history, ritual, and professional standards across a five week curriculum",
        "Coordinated weekly pledge meetings, professional workshops, and brotherhood events to develop well-rounded new members",
        "Partnered with the executive board to evaluate pledge progress and ensure successful initiation into active brotherhood",
      ],
    },
    {
      title: "Director of Brotherhood",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Jan. 2025 – Mar. 2025",
      logo: "/logos/akpsi.jpeg",
      stats: [
        { value: "80+", label: "Active Brothers" },
        { value: "$1K", label: "Budget" },
      ],
      bullets: [
        "Planned and coordinated social events for 80+ Active Brothers to strengthen relationships within the fraternity",
        "Supervised a $1K budget with executive board members to support high-impact brotherhood events aligned with the fraternity's values and goals",
      ],
    },
    {
      title: "Co-Vice President of Marketing",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2024 – Dec. 2024",
      logo: "/logos/akpsi.jpeg",
      stats: [
        { value: "272%", label: "Accounts Reached" },
        { value: "75+", label: "Event Attendees" },
        { value: "170+", label: "Interest Responses" },
      ],
      bullets: [
        "Increased Instagram engagement through content creation with Canva, resulting in a 272% increase in accounts reached and a 10.1% increase in followers within three months",
        "Organized a week-long recruiting event with 75+ attendees that included professional workshops and was sponsored by Red Bull and Celsius",
        "Outreached to students through social media, tabling, and classroom presentations, gathering 170+ interest responses",
      ],
    },
    {
      title: "Beta Delta Pledge Class Professional Committee Chair",
      org: "Alpha Kappa Psi Business Fraternity",
      location: "San Luis Obispo, CA",
      dates: "Oct. 2023 – Nov. 2023",
      logo: "/logos/akpsi.jpeg",
      stats: [
        { value: "$950+", label: "Raised" },
        { value: "5", label: "Guest Speakers" },
      ],
      bullets: [
        "Orchestrated a guest speaker event featuring five industry professionals specializing in business, medicine, and engineering",
        "Raised over $950 individually to support the pledge class over five weeks through successful fundraisers, utilizing strong networking skills",
        "Collaborated with the rest of the pledge class to plan brotherhood, philanthropy, and fundraising events",
      ],
    },
    {
      title: "Week of Welcome Orientation Leader",
      org: "Week of Welcome (WOW) Orientation Program",
      location: "San Luis Obispo, CA",
      dates: "Apr. 2024 – Sept. 2024",
      logo: "/logos/calpoly.jpeg",
      stats: [
        { value: "19+", label: "Freshmen Led" },
        { value: "30+", label: "Training Hours" },
      ],
      bullets: [
        "Led a group of 19+ freshmen through college orientation week, serving as representative student ambassador to the university",
        "Attended 30+ hours of training to gain personal, professional & leadership development",
        "Facilitated conversations on important topics about empathy and diversity, equity, & inclusion",
      ],
    },
  ],

  skills: ["Canva", "Claude", "Google Workspace", "Microsoft Office Suite", "Slack", "Tableau", "Zoom"],

  interests: [
    { name: "Calisthenics",        type: "image", src: "", photos: [] as string[], description: "I always saw people doing handstands, levers, and muscle-ups online and thought it looked crazy cool, but running took up all my time in high school. My first two years at Cal Poly I got into bodybuilding instead, and I didn't actually start training calisthenics until junior year.\n\nSince then I've been training the front lever pretty much every day (that's the skill where you hold your body flat, parallel to the ground, off a pull-up bar). I recently got my first muscle-up and I'm working on handstand push-ups now too. Honestly the hardest part isn't the skills themselves, it's just showing up on the days I'm tired or don't feel like training. Running cross country and track in high school already taught me that kind of discipline, so it's carried over pretty naturally. My goal is to have the front lever and human flag both locked in by the end of senior year." },
    { name: "Guitar",              type: "image", src: "", photos: [] as string[], description: "I took a guitar class in middle school and fell in love. After the class ended I started taking lessons from a college student, and after 6 months I started teaching myself. My dad bought a 12 string guitar from an auction which we later sold so I could buy my first ever electric guitar." },
    { name: "Piano",               type: "image", src: "", photos: [] as string[], description: "I started learning piano in elementary school and took lessons all the way up until freshman year of high school, until COVID unfortunately cut my piano lessons short. I enjoy playing classical and pop music, and have started experimenting with songwriting originally on the piano." },
    { name: "Running",             type: "image", src: "", photos: [] as string[], description: "I started running cross country and track and field in middle school. I fell in love with the running community and ran all four years of high school. Favorite workout: Hill Repeats. Favorite race: 800 meter." },
    { name: "Singing/Songwriting", type: "image", src: "", photos: [] as string[], description: "In high school I started experimenting with creating music using LMMS and BandLab. I also played in a band called Late Spring, and we released a song on Spotify called \"over u\" (GO LISTEN). More recently in college I've learned Logic Pro and Ableton, and have continued to study music theory and jazz over the last couple years." },
    { name: "Soccer",              type: "image", src: "", photos: [] as string[], description: "I've played soccer from 1st grade all the way through my senior year of high school. What once started as a sport my mom signed me up for without my knowledge, it has since become one of my favorite physical activities. Messi > Ronaldo" },
  ],

  // Placeholders: fill in title/type/description. For playback, use either audioSrc (a raw
  // mp3/wav file in public/, plays inline with a custom player) or embedUrl (a Spotify/SoundCloud/
  // YouTube embed link, renders as an iframe). link adds an external "Listen" button.
  projects: [
    { title: "Original Song #1", type: "Original Song", description: "", audioSrc: "", embedUrl: "", link: "" },
    { title: "Production / Mix", type: "Production",    description: "", audioSrc: "", embedUrl: "", link: "" },
    { title: "Cover",            type: "Cover",         description: "", audioSrc: "", embedUrl: "", link: "" },
    { title: "DJ Set / Mix",     type: "DJ Mix",         description: "", audioSrc: "", embedUrl: "", link: "" },
  ],
};
