# INP Improvment Plan

[Dillards.com](https://www.dillards.com) for mobile web has a poor INP score.  The following is a plan, with actionable steps, to improve the INP score.

The focus in on the mobile web version of the website and we are focusing on the interactions for the home page primarily.

The INP metric is a measure of how quick a website responds to user interactions.  The INP value is the highest time, for a paint to occur, of all in page interactions.

  
#### Justification:
- Websites that don’t respond within 200 ms lead to user frustration and abandonment, reducing conversion rates. Even a delay as short as the duration of a blink can create a perception of unresponsiveness. Modern users expect immediate feedback, any interaction above 200 ms qualifies as a “long interaction” and should be addressed via root cause analysis.
- It's also been shown that users that experience usability frustration are less likely to have return vists.

#### Recommended Solutions:
- Analyze the live production code and identify interactions exceeding 200 ms. Inspect the call stacks for operations triggering expensive browser tasks such as "Layout" (called "Reflow" in Firefox).
- Break up long runing tasks into smaller Javascript chunks
See [solutions.md](./Solution.md) for a detailed breakdown and specific code recommendations.


#### Impact:

- Current INP on PageSpeed Insights: 1,171 ms
- Simple menu interactions alone produce ~250 ms delays.
- Continuing interactions with the page results in experiencing further visible interaction pauses, driving INP over 1200 ms.
- Applying the recommended changes is expected to reduce INP to around 100 ms for field data at the 75th percentile
- (Note: LCP improvements are also possible, such as preloading the hero image, but are out of scope for this analysis.)


#### Confidence:

- The recommended techniques — such as using requestAnimationFrame and setTimeout() to yield to the main thread are well supported in Chrome and Safari.
- While Safari doesn’t report INP, its users still experience jank if performance is poor. These solutions are aligned with best practices across modern browsers.

#### Effort:
- Issue #1: Medium effort. It involves locating multiple read/write calculation points and resolving layout thrashing issues. This is more mechanical but likely require many changes throughout the system code.

- Issue #2: Medium effort. The developer must locate the relevant functions in dillards.js (see `solutions.md`) and apply setTimeout() or other main-thread yielding methods. This will require local testing and iteration.

#### Code Snippet:
- see /src/ for the 2 .js files that contain the current code and suggested new code as snippets

#### Video Walkthrough:
- [Loom Video Walkthrough](https://www.loom.com/share/8b3ec5f21db74216b9bba2c94e638353?sid=ef8e356a-eb6d-44ac-bdac-25b211943424)

