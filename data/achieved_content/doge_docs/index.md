---
title: "REPO: doge_docs (for v3)"
state: "ACHIEVED"
date: "2022-09-18T02:06:43Z"
description: "The document of doge-v3."
githubUrl: "https://github.com/ChouYuanjue/doge_docs"
---

The original Chinese version is available at [https://docs-doge.netlify.app/](https://docs-doge.netlify.app/)

In this document, content enclosed in `<>` indicates **required variables**, `|` denotes "or", and content in `[]` represents **optional variables**. **Do not include these symbols** when using the commands.

# Introduction
Doge Bot is built on the Mirai framework, utilizing the **ANDROID_PHONE** and **ANDROID_PAD** protocols.

Its functions are divided into two main modules: new features developed based on mirai-console (JVM) and legacy features ported from the old version using mirai-native. Currently, the number of features in both modules is roughly equal.

The first version of Doge was born on March 30, 2020, based on CQP. It received intermittent updates over the following four months, during which the developer received kind assistance and support from many users. At its peak, Doge had over a hundred friends and was added to more than 30 group chats. On August 2, 2020, it suffered a devastating blow during Tencent's second QBot purge, which led to the collapse of the CQP framework. Subsequent attempts to migrate to Mirai yielded extremely unsatisfactory results, prompting the developer to delete the repository and abandon the project. Thus, the first version of Doge ended its short-lived existence.

Two years later, the developer was deeply touched to discover that Doge was still remembered while chatting in the Math Bar on a forum. Coincidentally, the developer had just discussed TeX functionality with Fyr, the creator of the Liqi Bot. This rekindled the idea of rebuilding the bot. Development on the new version commenced on July 25, 2022. The developer found that the QBot ecosystem had undergone tremendous changes over the two years, requiring a significant amount of time to adapt. The current version uses mirai-console-2.12.0, which still has some unresolved issues. A major crash occurred on July 27; the bot was reconfigured and underwent a major update on July 28, marking the official rebirth of Doge.

Gratitude goes to everyone who has provided help, as well as those who still remembered the bug-ridden original Doge after two years. Special thanks to Fyr and his Liqi Bot—without them, neither version of Doge would have existed.

**Friendship Links**:
- Mirai Main Repository: [mamoe/mirai](https://github.com/mamoe/mirai)
- Liqi User Guide: [User Guide](http://liqisese.top:800/help/)

# Update Log
- 2022-09-18: Updated the `/gen` and `/chart` feature modules; fixed minor bugs.
- 2022-09-11: Updated the `/dream`, `/style`, and `/toonify` feature modules; added `/pic-url` and `/url-pic` commands.
- 2022-09-04: Updated the `/phil` feature module; added `/game nc` and `/math oeis` commands; updated the documentation system.
- 2022-08-30: Updated the `/meme` feature module; added the `/bing` command.
- 2022-08-29: The 8th major crash (Tencent risk control). Issue temporarily resolved.
- 2022-08-29: Updated the `/siku` feature module.
- 2022-08-28: Updated the `/genshin` feature module; disabled the `/px kw` command; updated and disabled the `/se` feature module.
- 2022-08-28: Unit 3 revived. All functions restored.
- 2022-08-18: The 7th major crash (Tencent account suspension). Why isn't Tencent dead yet?
- 2022-08-18: Bot migrated to Unit 3.
- 2022-08-17: The 6th major crash (Unit 2 permanently banned).
- 2022-08-16: The 5th major crash (Tencent account frozen).
- 2022-08-11 to 2022-08-15: Added `/gan person`, `/gan chem`, `/amuse cp`, and `/px kw` commands; added `/yg`, `/gpt`, and `/cotool` feature modules; rewrote the `/run` feature module.
- 2022-08-05: Added `/gan furry` and `/gan anime` commands.
- 2022-08-04: Added `/chem` and `/perc` feature modules; added the `/math system` command.
- 2022-08-03: Added `/insult` and `/fru` feature modules.
- 2022-08-02: Bot migrated to Unit 2 for private use. All functions restored.
- 2022-07-31: The 4th major crash (Unit 1 permanently banned). Due to the account suspension, most functions became unavailable, and the bot was taken offline. Thank you for your company.
- 2022-07-30: The 3rd major crash (Tencent account suspension).
- 2022-07-30: Added the `/poem` feature module; added the `/ask` command; rewrote the `/run` feature module (still non-functional).
- 2022-07-29: The 2nd major crash (Tencent risk control).
- 2022-07-28: Restored most legacy functions.
- 2022-07-27: The 1st major crash.
- 2022-07-26: Added some new features.
- 2022-07-25: Started configuring the bot. Added some new features.

# Developers
Contributions to Doge are welcome. Please refer to the Mirai Development Documentation: [mirai docs](https://docs.mirai.mamoe.net/). Doge encourages the development of features using JVM or mirai-api-http, but mirai-native is not recommended. The current dual-protocol architecture is designed to prevent bot outages caused by mirai-native crashes.

All commands in Doge **must** start with `/`, followed by the English name or abbreviation of the function. Please note this if you intend to contribute.

All plugins should avoid including irrelevant or personal code and must be successfully tested on at least one bot in MCL2. If possible, please submit the source code, README, and packaged JAR (for JVM) or EXE (for api-http) files to the developer. These are **requests**, not strict requirements, but we hope contributors will abide by them voluntarily. If debugging is inconvenient, the developer may set up a dedicated MCL environment for testing such plugins in the future (this is not required for mirai-api-http plugins).

Regarding feature development, we welcome features of all sizes—in fact, we prefer small, focused features over large, complex ones (primarily because the developer's server is severely underpowered). Any feature you find interesting or useful is eligible for a pull request. For very small features, you can directly contact the developer to implement them, though there is no guarantee that the request will be fulfilled.

Due to certain constraints, the developer may only be able to debug the bot once every one to two weeks. Delays in responses or temporary inactivity may occur. We sincerely apologize for any inconvenience.

If you still wish to contribute after reading these somewhat uncompromising requirements, feel free to contact the developer for more details. Let us work together to make Doge even better.

**Doge Bot Project Repository**: [doge-qbot/doge-repo](https://github.com/doge-qbot/doge-repo)

# Need Help Using It?
```
/docs
```
View the user guide. This document should address nearly all of your questions. Please follow the instructions carefully and avoid asking questions like "Why isn't `/tex` working?" (The correct command is `/tex render`).

```
/ask <question content>
```
If this document fails to resolve your issue, use this command to submit your question. The question will be forwarded to the developer and answered in the FAQ section at the end of this document.

# Join Groups/Add as Friend
Due to previous account suspensions, friend requests and group join applications are no longer approved automatically to ensure the security of Doge's account. Please contact the developer directly.

# Chat
The new version of Doge uses the Moli Cloud API for intelligent chat interactions.

# Run Code 『/run』
This feature has been rewritten again. The daily usage limit is 100 calls; the limit may be increased if the feature proves popular. If you wish to add support for additional programming languages, please contact the developer.

**Usage**:
```
/run <language> <code content>
```
**Note**: A space **must** follow the language name!

Currently supported languages:
```
/run c
/run cpp
/run c#
/run py2
/run py3
/run haskell
/run java
/run js
/run kt
/run lua
/run php
/run perl
/run R
```
**Example**:
```
/run py3 print ('Hello, World!')
```

# Scientific Calculation 『/wa』
This feature uses the WolframAlpha API, with a monthly usage limit of 2000 calls. If the command yields no response after multiple attempts, the monthly quota has likely been exhausted.

**Usage**:
```
/wa <expression>
```
**Example**:
```
/wa integrate x^2 sin^3 x dx
```

# LaTeX Rendering 『/tex』
Supports the `tikz`, `tikz-cd`, `xy-pic`, and `mhchem` packages; does **not** support `tcolorbox`, `physics`, `calc`, or Unicode packages.
Supports definitions using `\def`, `\newcommand`, and `\renewcommand`; does **not** support fine-tuning with `\raise` or `\kern`.

**Usage**:

*Render Formula*
```
/tex render
<TeX code>
```
**Example**:
```
/tex render
A_{m,n} = \begin{pmatrix} a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\ a_{2,1} & a_{2,2} & \cdots & a_{2,n} \\ \vdots  & \vdots  & \ddots & \vdots  \\ a_{m,1} & a_{m,2} & \cdots & a_{m,n} \end{pmatrix}
```
However, errors may occasionally occur (primarily when drawing commutative diagrams). If the rendering result is abnormal and you have confirmed that no unsupported packages are used, try the following alternative solution:

*Render URL-Encoded Formula*
```
/tex urender
<URL-encoded TeX code>
```
**Example**:
```
/tex urender
%5Cxymatrix%7B%0A%20%20A%20%5Car%5Br%5D%5Ef%20%5Car%5Bd%5D_g%20&%0A%20%20B%20%5Car%5Bd%5D%5E%7Bg'%7D%20%5C%5C%0A%20%20D%20%5Car%5Br%5D_%7Bf'%7D%20&%0A%20%20C%0A%7D
```
**Note**: Encode spaces as `%20`, **not** `+`. You can use the tool at this website for encoding: https://www.matools.com/code-convert

*Random TeX Formula Image*
```
/tex random
```
Formulas are scraped from arXiv and stored locally. The database contains approximately 100,000 entries, which may cause slight delays in response. This feature repurposes leftover data from a failed machine learning project and will not be modified in the future. Images can only be viewed correctly on desktop clients.

# Complete Library of Four Treasuries 『/siku』
**Usage**:

*Search for Ancient Book ID*
```
/siku kw <keyword>
```
**Example**:
```
/siku kw 全唐诗
```
The return format will be as follows:
```
ID:3842r > *Imperially Commissioned Complete Tang Poems, Volume 1* [Qing Dynasty, 42nd Year of Kangxi Reign]
ID:3843h > *Imperially Commissioned Complete Tang Poems, Volume 2* [Qing Dynasty, 42nd Year of Kangxi Reign]
ID:3844l > *Imperially Commissioned Complete Tang Poems, Volume 3* [Qing Dynasty, 42nd Year of Kangxi Reign]
ID:3845i > *Imperially Commissioned Complete Tang Poems, Volume 4* [Qing Dynasty, 42nd Year of Kangxi Reign]
ID:3846h > *Imperially Commissioned Complete Tang Poems, Volume 5* [Qing Dynasty, 42nd Year of Kangxi Reign]
```
The string before the colon is the ancient book ID, and the text after is the book title.

*Read Specific Page*
```
/siku read <ID> <page number>
```
This command returns an image of the specified page from the ancient book. The page number **must** be formatted as a four-digit number (e.g., use `0001` for page 1). For multi-volume ancient books (as in the example above), note that the page numbering of each subsequent volume continues sequentially from the last page of the previous volume.

# Poetry 『/poem』
**Usage**:
```
/poem <type>
```
The type parameter can be one of the following:
```
shuqing (Lyric)
siji (Four Seasons)
shanshui (Landscape)
tianqi (Weather)
renwu (Figures)
shenghuo (Daily Life)
jieri (Festivals)
dongwu (Animals)
zhiwu (Plants)
shiwu (Food)
```

# Commissioned Art 『/yg』
AI generates images from text prompts. You can try describing impossible real-world scenarios, such as *An octopus fights with a tiger*. Due to the limited size of Chinese training datasets, **please use English prompts**. This feature is extremely popular, so the developer has upgraded it from single-threaded to multi-threaded processing. However, to prevent server crashes, only one task can be executed per group at a time. If the command is invoked before the previous task is completed, the bot will only return an `@username` mention.

**Usage**:
```
/yg <content>
```

# GPT-2 Text Generation 『/gpt』
GPT-2 is a powerful language model developed by OpenAI. This feature uses GPT-2 to continue text such as news articles or novels, producing results that can be indistinguishable from human-written content. For the same reason as the `/yg` command, **please use English prompts**. This feature is not memory-intensive and has been optimized with multi-threading, so it can be used with confidence.

**Usage**:
```
/gpt <content>
```
**Example**:
```
/gpt In a shocking finding, scientist from Carnegie Mellon University discovered a herd of zombies living in a remote.
```

# Google DeepDream 『/dream』
Transforms images using Google's DeepDream algorithm. For more details, refer to: [DeepDream|TensorFlow Core](https://tensorflow.google.cn/tutorials/generative/deepdream). The results are moderate due to insufficient training intensity.

**Usage**:
```
/dream <image>
```
A space between the command and the image is optional.

*Random DeepDream Image*
```
/dream random
```

# Style Transfer 『/style』
Uses AI to apply the style of one image to another.

**Usage**:
```
/style pic <image1> <image2>
```
A space **must** follow `pic`; spaces between the two images are optional. This command transfers the style of `image2` to `image1`.

```
/style url <image URL1> <image URL2>
```
This command addresses the issue where some mobile devices cannot send text accompanied by two images. You can obtain image URLs using the `/pic-url <image>` command.

# Disney-Style Character Transformation 『/toonify』
Detects human faces in images and converts them into a Disney animation art style. Implemented using a Convolutional Neural Network (CNN).

**Usage**:
```
/toonify <image>
```
A space between the command and the image is optional.

# Paper Generation 『/gen』
If you are familiar with Scigen and Mathgen, you will understand the nature of this feature.

**Usage**:

*Generate Mathematics Paper (Mathgen)*
```
/gen math
```

*Generate Computer Science Paper (Abstract Only)*
```
/gen cs
```

*Generate hep-ph Paper (Abstract Only)*
```
/gen hep-ph
```

# Eloquent Insults 『/insult』
**Usage**:

*Quote Shakespearean Lines*
```
/insult sh
```
The lines are in Early Modern English, so they may seem strange to modern readers.

*Generate Shakespeare-Style Lines*
```
/insult gensh
```
Also in Early Modern English.

*Quote Martin Luther Lines*
```
/insult lu
```

# Philosophical Quotes 『/phil』
**Usage**:

*Random Philosophical Quote*
```
/phil idea
```

*Random Philosopher*
```
/phil er
```

*Keyword Search*
```
/phil kw <content>
```

# Chemical Substance Query 『/chem』
This feature was added to balance the academic functionality, which previously focused solely on mathematics. The developer is not a chemistry major and does not have access to major chemistry databases, making it difficult to implement more complex features.

**Usage**:

*Render Chemical Structure Image*
```
/chem img <structural formula|name|SMILES>
```
The structural formula input requires specific formatting and generally cannot use the simplified notation taught in high school chemistry. For example, to query ethylene, use `H2C=CH2` instead of `CH2=CH2`. Please experiment to determine the correct formatting rules. For best results, it is recommended to use SMILES notation or search by the **English name** of the substance.

**Example**: (Benzocyclooctatetraene)
```
/chem img c1ccc(C2C3c4cc5ccccc5cc4C2c2cc4ccccc4cc23)cc1
```

*Query SMILES Notation*
```
/chem smiles <structural formula|name>
```
Follows the same formatting rules as above. A `404` response indicates that the substance is not in the database.

*Query Name and Related Information*
```
/chem names <structural formula|name|SMILES>
```
Follows the same formatting rules as above.

*Query InChIKey*
```
/chem ick <structural formula|name|SMILES>
```
If you do not know what an InChIKey is, you probably do not need to use this command—no further questions, please.

*Query Molecular Formula*
```
/chem formula <structural formula|name|SMILES>
```
The practical utility of this function is questionable (lol).

# Chart.js Chart Generation 『/chart』
Generates charts using Chart.js.

- Chart.js v2 Documentation: [Charts-2.9.4](https://www.chartjs.org/docs/2.9.4/charts/)
- Chart.js v3 Documentation: [Charts-latest](https://www.chartjs.org/docs/latest/charts)

**Usage**:

*Call Chart.js v2*
```
/chart <code>
```
**Example**:
```
/chart {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [10, 30, 39, 20, 25, 34, -10],
      fill: false,
    }, {
      label: 'Second dataset',
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: [18, 33, 22, 19, 11, 39, 30],
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Grid Line Settings'
    },
    scales: {
      yAxes: [{
        gridLines: {
          drawBorder: false,
          color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }]
    }
  }
}
```
![v2-sample](https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27January%27%2C%20%27February%27%2C%20%27March%27%2C%20%27April%27%2C%20%27May%27%2C%20%27June%27%2C%20%27July%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27First%20dataset%27%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20borderColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20data%3A%20%5B10%2C%2030%2C%2039%2C%2020%2C%2025%2C%2034%2C%20-10%5D%2C%0A%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20label%3A%20%27Second%20dataset%27%2C%0A%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20borderColor%3A%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20data%3A%20%5B18%2C%2033%2C%2022%2C%2019%2C%2011%2C%2039%2C%2030%5D%2C%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20responsive%3A%20true%2C%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Grid%20Line%20Settings%27%0A%20%20%20%20%7D%2C%0A%20%20%20%20scales%3A%20%7B%0A%20%20%20%20%20%20yAxes%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20gridLines%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20drawBorder%3A%20false%2C%0A%20%20%20%20%20%20%20%20%20%20color%3A%20%5B%27pink%27%2C%20%27red%27%2C%20%27orange%27%2C%20%27yellow%27%2C%20%27green%27%2C%20%27blue%27%2C%20%27indigo%27%2C%20%27purple%27%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20min%3A%200%2C%0A%20%20%20%20%20%20%20%20max%3A%20100%2C%0A%20%20%20%20%20%20%20%20ticks%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20stepSize%3A%2010%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)

*Call Chart.js v3*
```
/chartv3 <code>
```
**Example**:
```
/chartv3 {
  type: 'line',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Data',
      data: [6.06, 82.2, -22.11, 21.53],
      lineTension: 0.4,
      borderColor: '#ff3333',
      backgroundColor: '#ffcccc',
      fill: {
        target: {
          value: 30,
        },
        above: 'transparent',
        below: '#ffcccc',
      }
    }]
  }
}
```
![v3-sample](https://quickchart.io/chart?v=3&c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Data%27%2C%0A%20%20%20%20%20%20data%3A%20%5B6.06%2C%2082.2%2C%20-22.11%2C%2021.53%5D%2C%0A%20%20%20%20%20%20lineTension%3A%200.4%2C%0A%20%20%20%20%20%20borderColor%3A%20%27%23ff3333%27%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27%23ffcccc%27%2C%0A%20%20%20%20%20%20fill%3A%20%7B%20%0A%20%0A%20%20%20%20%20%20%20%20target%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20value%3A%2030%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20above%3A%20%27transparent%27%2C%0A%20%20%20%20%20%20%20%20below%3A%20%27%23ffcccc%27%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D%0A)

# Perchance External API 『/perc』
This is an experiment to implement JavaScript interaction via Glitch. JavaScript cannot be installed on the server, so this workaround was adopted. The functionality itself is unrelated to these technical details. Perchance is a text generator website that does not offer an official API— the developer built a custom interface using Glitch for this purpose.

Perchance Website: [Generators](https://perchance.org/generators) — Explore generators here to find ones you want to use.

**Usage**:
```
/perc <generatorID> [list]
```
The first time you use a generator, the response may be slow. The `generatorID` refers to the string following `https://perchance.org/` in the generator's URL. For example, the ID for `https://perchance.org/booknamer` is `booknamer`. The `list` parameter is optional; it defaults to `output`. To see available lists, review the source code of the generator you are using.

You can also use the following examples directly:

**Examples**:

*Generate Poetry*
```
/perc poemoracle
```
*Generate Nonsensical Math Problems*
```
/perc mathy
```
*Abstract Collection*
```
/perc bja27rbxpg
```
*Generate Animal Sentences*
```
/perc animal-sentence
```
*Generate Alternate History*
```
/perc gen-history year
```

# Fake Russian Translation 『/fru』
As the name suggests, this feature converts text into strings that **look like Russian but are not actually Russian**. It can be used to prank people with no knowledge of the Russian language.

**Usage**:

*English to Fake Russian*
```
/fru en <content>
```
Uppercase letters are not supported. The conversion works by directly transliterating English letters into Cyrillic characters.

*Pinyin to Fake Russian*
```
/fru py <content>
```
Do not include tone marks. The conversion simulates Chinese pronunciation using Russian phonetics. This is the developer's preferred transliteration method and may differ slightly from standard conventions.

*Chinese to Fake Russian*
```
/fru zh <content>
```
The conversion first translates Chinese text to Pinyin, then applies the Pinyin-to-Fake-Russian rule described above.

# Generate Emoticons 『/rua』
A signature emoticon generation feature for Mirai bots, once one of the most common features among Mirai-based bots (lol).

**Usage**:
```
/rua [Key] <@username>
```
You can also use an image:
```
/rua [Key] <image>
```
The `[Key]` parameter is optional; if omitted, a random emoticon will be generated. Valid values for `[Key]` are as follows:
```
anyasuki (Anya likes it)
bite (Nibble/Bite)
breast (Chest/Angry)
cast (Throw)
center_symmetry (Central symmetry/Top-left symmetry)
coupon (Sleepover)
cover_face (Cover)
crawl (Crawl)
decent_kiss (Sorry)
distracted (Distracted)
dont_touch (Stay away)
down_symmetry (Symmetry/Bottom symmetry/Top-bottom symmetry)
eat (Eat)
fencing (Fencing)
garbage (Trash can/Garbage/Peek)
hammer (Hammer)
interview (Interview)
jiujiu (Smooch)
keep_away (Keep away)
kiss (Kiss/Passionate kiss)
knock (Knock/Hit)
left_down_symmetry (Central symmetry/Bottom-left symmetry)
leg (Rub against)
like (Like forever)
loading (Loading/In progress)
make_friend (Add friend)
marry (Marry)
nano (Nanotechnology)
need (Need)
osu
painter (Draw)
pat (Pat)
perfect (Perfect)
petpet (Pat/Pat head)
play (Play/Bounce)
police (Police)
pound (Pound)
pr (Screen licking)
punch (Punch)
record (Record)
right_down_symmetry (Central symmetry/Bottom-right symmetry)
right_symmetry (Symmetry/Right symmetry/Left-right symmetry)
right_up_symmetry (Central symmetry/Top-right symmetry)
roll (Roll/Push)
rub (Lick/Prpr)
safe_sense (Sense of security)
suck (Suck)
support (Spiritual pillar)
symmetry (Symmetry/Left symmetry/Left-right symmetry)
tear (Tear)
thinkwhat (Think)
throw (Throw)
thump (Thump)
tightly (Stick to)
twist (Hug)
up_symmetry (Symmetry/Top symmetry/Top-bottom symmetry)
wallpaper (Wallpaper)
worship (Worship)
yoasobi (Gunjou)
```
**Example**:
```
/rua twist @Doge Bot
```
**[SEALED]** There was a 30% chance of this feature being triggered by a poke. (Due to protocol changes, pokes no longer trigger this function.)

# Memes 『/meme』
**Usage**:
```
/meme mc
```
Sends cute Menhera-chan memes.
```
/meme ch
```
Sends Little Parrot (Yellow Chick) memes.
```
/meme wh
```
Sends White Guy memes.
```
/meme pg
```
Sends Penguin memes.
```
/meme fu
```
Sends a messy collection of smug emoticons.

*Also, if anyone has a complete set of Pusheen cat emoticons, please contact Doge immediately.*

# Genshin Impact Gacha 『/genshin』
This feature requires authorization from the developer to use in specific groups. It simulates Genshin Impact gacha pulls using the API from: [GardenHamster/GenshinPray](https://github.com/GardenHamster/GenshinPray).

**Usage**:

*View Menu*
```
/genshin menu
```
*Gacha Functions*
```
/genshin Character Single Draw [1-10]
```
Numbers 1-10 correspond to different gacha banners and can be omitted. The same applies to the commands below.
```
/genshin Character Ten Draws [1-10]
```
```
/genshin Weapon Single Draw
```
```
/genshin Weapon Ten Draws
```
```
/genshin Standard Single Draw
```
```
/genshin Standard Ten Draws
```
```
/genshin All Character Single Draw
```
```
/genshin All Character Ten Draws
```
```
/genshin All Weapon Single Draw
```
```
/genshin All Weapon Ten Draws
```

# Miscellaneous Entertainment Functions 『/amuse』
**Usage**:

*Compliment Me/Compliment Someone*
```
/amuse chp <me|@username>
```
Rainbow fart (exaggerated praise) function.

*Insult Me/Insult Someone*
```
/amuse zuan <me|@username>
```
Unleashes a barrage of insults at the specified target (also suitable for masochists).

*Roast Me/Roast Someone*
```
/amuse du <me|@username>
```
Outputs cynical quotes (poisonous chicken soup).

*Generate Random Gibberish*
```
/amuse gar
```
Not actually completely random.

*Flatter Me/Flatter Someone*
```
/amuse tian <me|@username>
```
Calls a simp diary API; content may be somewhat discomforting.

*Generate CP Fanfiction*
```
/amuse cp <Character 1> <Character 2>
```

# Encoding/Decoding Tools 『/cotool』
**Usage**:

*URL Encode/Decode*
```
/encode url <content before encoding>
```
```
/decode url <content after encoding>
```
*Unicode Encode/Decode*
```
/encode usc2 <content before encoding>
```
```
/decode usc2 <content after encoding>
```
*Hex Encode/Decode*
```
/encode hex <content before encoding>
```
```
/decode hex <content after encoding>
```
*Base64 Encode*
```
/encode base64 <content before encoding>
```
*Text Encryption/Decryption*
```
/encrypt <content before encryption> [password]
```
```
/decrypt <content after encryption> [password]
```
The password parameter is optional.

# Network Tools 『/netool』
**Usage**:

*Ping Test*
```
/ping <target> [number of pings] [timeout/ms]
```
**Example**:
```
/ping 127.0.0.1 10
```

*Webpage Test*
```
/web <URL> [encoding]
```
**Example**:
```
/web https://baidu.com
```

*Port Scan*
```
/nmap <target> [port]
```
**Example**:
```
/nmap 127.0.0.1 8080
```

*Firewall Check*
```
/gc <target>
```

# Game Functions 『/game』
A collection of game-related features.

**Usage**:

*24 Game*
```
/game 24p
```
Send the command to view the rules. (Requires authorization from the developer. Contact the developer if you need access.)

Supports arithmetic operations `+, -, *, /` and bitwise operations `>>` (right shift), `<<` (left shift), `&` (AND), `^` (XOR), `|` (OR).

**CAUTION**: The `^` symbol here denotes **XOR**, **not** exponentiation!

To calculate bitwise operations, you can use the following command mentioned later:
```
/math calc <expression>
```
For an explanation of bitwise operations, refer to the FAQ at the end of this document.

*Nine Men's Morris*
```
/game nc
```
Send the command to view detailed rules.

**Rules**: After both players place all 9 of their pieces on the board, the game enters the movement phase. Players take turns moving their pieces to adjacent empty spots. The first player to form a straight line of three of their pieces wins.

# Math-Related Functions 『/math』
**Usage**:

*Logical Judgment*
```
/math logic <logical expression>
```
Returns `True` if the logic is correct, `False` otherwise.
Supported symbols:
- "OR"/"||", "AND"/"&&"
- Arithmetic: `+, -, *, \, /, %`
- Parentheses: `()`
- Comparison: `=` (value equality), `==` (strict equality), `!=`, `!==`, `>`, `<`, `>=`, `<=`
- Others: `in` (contains), `!in` (does not contain), `reg` (regex match), `!reg` (regex no match)

**Example**:
```
/math logic 1!=3+4-5+2||3>4
```

*Calculate Result*
```
/math calc <expression>
```
Supports arithmetic operations: Addition `+`, Subtraction `-`, Multiplication `*`/`×`, Division `/`/`÷`, Parentheses `()`.

Supports other numerical operations:
- Modulo `%`
- Integer division `\`
- Exponentiation `^` (e.g., `4%3=1`, `4\3=1`, `4^3=64`)

Supports chained operations using the `,` symbol (e.g., `4+3,×5,-7` is equivalent to `((4+3)×5)-7`).

Supports rounding using the `@` symbol: `x@y` rounds `x` to the `y`-th digit relative to the units place.
- If `y > 0`, rounds to `y` decimal places.
- If `y = 0`, rounds to the nearest integer.
- If `y < 0`, rounds to the `|y|`-th digit to the left of the decimal point (parentheses are required).

Supports bitwise operations: Left shift `<<`, Right shift `>>`, Bitwise OR `or`, Bitwise AND `and`, Bitwise XOR `xor`.

**Example**:
```
/math calc 4+5,^3,/3,@2,xor1
```

*MathWorld*
```
/math mw <entry>
```
The entry must be in English, with spaces and apostrophes omitted. All words except prepositions and conjunctions should be capitalized (please follow this rule strictly; otherwise, the query will fail). For example: Dyck's Theorem → `DycksTheorem`, Lie algebra → `LieAlgebra`, probability and statistics → `ProbabilityandStatistics`.

To check if an entry exists, use the following command:
```
/web https://mathworld.wolfram.com/search/?query=<entry>
```
**Example**:
```
/math mw Handle
```

*Encyclopedia of Mathematics*
```
/math em <entry>
```
The entry must be in English, with spaces replaced by underscores `_`.

**Example**:
```
/math em adjoint_module
```

*Query Pi*
```
/math pi <starting digit> <number of digits to query>
```
**Example**:
```
/math pi 0 100
```

*Number System Conversion*
```
/math system <original number> <original base> <target base>
```
Supported bases: 2, 4, 8, 10, 16, 32, 64.

**Example**:
```
/math system 114514 10 2
```

*OEIS Sequence Query*
```
/math oeis <sequence fragment|sequence number>
```
Sequence numbers must start with an uppercase `A`.

**Examples**:
```
/math oeis 1,1,4,5,1,4
```
```
/math oeis A004861
```

# Pixiv Functions 『/px』
**Usage**:

*ID Query*
```
/px id <image id>
```
For multi-page illustrations, append `-n` to the ID to view the n-th page. R18 images are not supported.

*User Query*
```
/px user <user id>[-page number]
```
**Example**:
```
/px user 54259522-2
```

*Reverse Image Search*
```
/px tst <image>
```
**CAUTION**: A space **must** be included between the command and the image; otherwise, the command will not be recognized.

*Anime Reverse Search*
```
/px tsf <image>
```
The most popular feature of the original Doge bot. Uses the SauceNAO API. Usage limits: 100 calls per day, with a maximum of 4 calls within 30 seconds. Please use this feature sparingly.

*NSFW Function*
```
/px setu
```
A fan-favorite feature (but you're not allowed to use it!). Access requires authorization from the developer; please contact the developer for details.

*Keyword Search*
```
/px kw <keyword>
```
**[SEALED]** For unknown reasons, many of the returned images are NSFW. Use with extreme caution.

# Jeff Jokes Generation 『/jeffjoke』
For an explanation of Jeff jokes, refer to the FAQ at the end of this document.

**Usage**:

*Generate Jokes About Yourself*
```
/jeffjoke <mj|myjoke> [number of jokes]
```
The number of jokes parameter is optional; defaults to 1.

*Generate Jokes About Someone Else*
```
/jeffjoke <dj|diyjoke> <username> [number of jokes]
```
**Example**:
```
/jeffjoke dj Doge 3
```

# StyleGAN 『/gan』
Generates images using StyleGAN. If the generated images appear too bizarre, do not panic—they are not real. For an explanation of StyleGAN, refer to the FAQ at the end of this document.

**Usage**:

*Generate Cat*
```
/gan cat
```

*Generate Painting*
```
/gan art
```

*Generate Horse*
```
/gan horse
```

*Generate Anime Portrait*
```
/gan waifu
```
May fail occasionally; try again multiple times (please wait between attempts).

*Generate Anime Image*
```
/gan anime
```
Mostly full-body portraits; human proportions may appear distorted.

*Generate Furry Image*
```
/gan furry
```
Results are quite good.

*Generate Human Portrait*
```
/gan person
```
Excellent results due to the large size of the training dataset.

*Generate Chemical Structure Image*
```
/gan chem
```

# Quotes 『/yan』
Records the words and deeds of group members. Recording is indiscriminate. If you wish to create a dedicated quote collection for a specific member, please contact the developer. The developer must be present in the group where the feature is requested, and the consent of the member being recorded must be obtained.

**Usage**:
```
/yan-<QQID> [keyword]
```
This is the theoretical command format, but you can request the developer to use a custom command, such as `XX Quotes` or `XX Stories`.

*View the Number of Recorded Quotes for a User in the Current Group*
```
/yan length <QQID>
```
This command requires authorization from the developer.

*View All Recorded Users in the Current Group*
```
/yan stars
```
This command requires authorization from the developer.

# Secret Functions 『/se』
**[SEALED]** These functions were sealed immediately after their creation, designed explicitly to provoke Tencent. (`/se` is an abbreviation for "secret".)

**Usage (hex)**:
```
/se tu

//B4F3BCD2CFB2CEC5C0D6BCFBB5C4C9ACCDBCB9A6C4DC
```
```
/se ph <content>

//506F726E687562B9D8BCFCB4CACBD1CBF7B7FECEF1A3A8CEDED0E8B4FAC0EDA3ACBFC9D6B1BDD3B7C3CECAA3A9
```
```
/se jav <id code>

//B5BAB9FAD3B0CAD3B7ACBAC5B2E9D1AFA3A8BFC9D4DACFDFB2A5B7C5A3A9
```
```
/se aps

//CBE6BBFACDF8D5BEA1A3C0B4D4B4A3BA68747470733A2F2F616C6C706F726E73697465732E6E6574
```
```
/se bt <content>

//4254D6D6D7D3CBD1CBF7
```

# Other Functions 『/other』
A collection of miscellaneous features, some of which are remnants from the original Doge bot that could not be fully restored.

**Usage**:

*Convert Image to URL*
```
/pic-url <image>
```
A space between the command and the image is optional.

*Convert URL to Image*
```
/url-pic <image URL>
```
Access requires authorization from the developer.

*Send High-Resolution Anime Image*
```
/anime
```
Formerly part of the `/img` feature module. The original api.computerfreaker.cf API is now completely defunct.

*Bing Daily Wallpaper*
```
/bing
```
*Today's Legal Quote*
```
/law
```
Randomly sends a quote from the Constitution. Formerly part of the `/laws` feature module; only constitutional quotes are available now.

*Generate Mirage Tank Image*
```
/mirage
```
For an explanation of Mirage Tank images, refer to the FAQ at the end of this document.

*Echo Specified Text*
```
/echo <content>
```
Formerly part of the `/cmd` feature module. For security reasons, only this trivial echo function remains.

*View Bot Version*
```
/ver
```

# FAQ

**1. What is a bitwise operation?**
A bitwise operation is a calculation that directly manipulates the binary digits of an integer in memory. See [Bitwise Operations](https://www.runoob.com/w3cnote/bit-operation.html)

**2. What are Jeff jokes?**
Jeff Dean is a legendary engineer at Google. Jeff jokes are lighthearted quips that (just kidding) purport to highlight Jeff's extraordinary capabilities based on "facts". See [JeffDeanFacts](https://github.com/LRitzdorf/TheJeffDeanFacts)

**3. What is StyleGAN?**
StyleGAN is a new generative adversarial network proposed by NVIDIA following ProGAN. Drawing on the concept of style transfer, it controls visual features by modifying different hierarchical levels without affecting other levels. See [NVlabs/StyleGAN](https://github.com/NVlabs/stylegan)

**4. What is a phantom tank image?**
It refers to a dual-layer image that consists of an outer layer and an inner layer. It displays one picture when not clicked, and switches to another picture when opened by clicking.

**5. Why doesn't Doge have the xxx feature?**
Submit a pull request, and then it will have this feature.

**6. Did Doge’s developer write all of its features?**
No. Some features are sourced from GitHub. But it can be guaranteed that at least 80% of them are self-developed. Most of the borrowed features can be rewritten independently, but that doesn’t mean the developer will do so.

**7. Why does the `/tex render` feature keep throwing errors?**
The developer hasn’t identified any bugs in the code yet. Currently, `/tex urender` is provided as a solution, which can fix all related issues.

**8. Why isn’t NSFW image generation supported?**
The first version of Doge was banned precisely for this reason. As an old saying goes: "Once a bot adds an NSFW image feature, it will end up being known only for that feature."

**9. Is Doge’s developer a computer science major?**
No. Otherwise, Doge would be far more advanced than its current version.

**10. Who is the developer?**
That’s a good question. Who is the developer?

**11. What is GPT-2?**
It is a powerful language model. See [OpenAI-Better Language Models](https://openai.com/blog/better-language-models/)

**12. How many features does Doge have now?**
It has a total of **31** feature modules and **128** functions, excluding the functions dedicated to bot management.
