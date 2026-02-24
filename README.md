# TevTube - YouTube Clone

A modern, responsive YouTube clone built with React, Vite, Tailwind CSS, and shadcn/ui.

## Features

- **Home Feed**: Displays trending videos using the YouTube Data API v3.
- **Search**: Search for any video by keywords.
- **Video Playback**: Watch videos using the official YouTube iframe embed.
- **Related Videos**: Sidebar with recommended videos.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Dark Mode**: Supports dark theme via shadcn/ui.
- **Skeleton States**: Smooth loading experience with skeleton screens.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **API**: YouTube Data API v3
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## Setup Instructions

### 1. Prerequisite
- Node.js installed
- YouTube Data API v3 Key (from Google Cloud Console)

### 2. Installation
Clone the repository and install dependencies:
```bash
yarn install
```

### 3. Environment Variable
Create a `.env` file in the root directory and add your API key:
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 4. Start Development Server
```bash
yarn dev
```

## Legal Note
This project uses the YouTube API but is not affiliated with YouTube. It is for educational/portfolio purposes only.
