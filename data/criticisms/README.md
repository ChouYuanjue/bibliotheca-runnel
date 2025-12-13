# Criticisms Content Structure

Each criticism/lecture should be in its own folder within this directory.
The folder name will be used as the URL slug.

Inside the folder, there must be an `index.md` file with the content.
You can also place images, PDFs, or other attachments in the folder.

## Folder Structure Example

```
data/criticisms/
  ├── my-lecture-slug/
  │   ├── index.md
  │   ├── cover.jpg
  │   └── slides.pdf
  └── another-review/
      ├── index.md
      └── diagram.png
```

## index.md Template

```markdown
---
title: "Title of the Criticism"
date: "YYYY-MM-DD"
type: "ESSAY" # or LECTURE, REVIEW, NOTE
image: "cover.jpg" # Relative path to image in this folder, or absolute path like /images/foo.jpg
description: "A short description for the card view."
---

# Heading

Your content here.

You can reference images in this folder:
![Diagram](diagram.png)

You can link to files:
[Download Slides](slides.pdf)
```
