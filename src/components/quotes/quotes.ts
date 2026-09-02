export type Quote = {
  text: string
  source?: string
  translation?: string
  hidden?: boolean
}

export const quotes: Quote[] = [
  {
    text: '怕什么真理无穷，进一寸有一寸的欢喜',
  },
  {
    text: "I didn't wanna be ordinary, I wanted to be extraordinary. I wanted to create my job, and speak different languages and travel. I wanted to be healthy, rich and free.",
    source: '我的塞林格之年',
  },
  {
    text: "I just feel like women, they have minds and they have souls, as well as just hearts. And they've got ambition and they've got talent, as well as just beauty. And I'm so sick of people saying that love is just all a woman is fit for, I'm so sick of it.",
    source: "小妇人",
    hidden: true,
  },
  {
    text: "You know, we as women, we as minorities—sort of—we are underestimating ourselves. And that is, I'm pretty smart. I work pretty hard; I'm good at what I do. I have really good instincts, great ideas, and I can execute them. And I say that out loud because we as women don't like to pat ourselves on the back. We're always sort of deferring to others. I want young girls out there to know that what's in their brain is really useful. Do not hide it; don't dumb it down. Don't apologize for it—just put it on the table and let people deal with it.",
    source: "米歇尔・奥巴马",
    translation:"你知道，我们作为女性，作为少数群体—某种程度上—我们都在低估自己。而事实是，我其实很聪明。我工作非常努力；我擅长自己所做的事。我有敏锐的直觉、很棒的想法，而且我能将这些想法付诸实践。我之所以大声说出这些，是因为我们女性往往不喜欢自我表扬。我们总是习惯性地顺从他人。我希望外面的年轻女孩们知道，你们头脑中的想法非常有价值。不要隐藏它，不要刻意弱化它，不要为它道歉—只管大胆表达出来，让大家去面对它就好。",
    hidden: true,
  },
]

export const visibleQuotes = quotes.filter((quote) => quote.hidden !== true)
