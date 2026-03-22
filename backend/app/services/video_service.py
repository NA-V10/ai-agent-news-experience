import cv2
import numpy as np
from gtts import gTTS
import uuid
import os


# 🎙️ Generate audio
def create_audio(text):
    filename = f"{uuid.uuid4()}.mp3"
    tts = gTTS(text)
    tts.save(filename)
    return filename


# 🖼️ Create simple frame (image with text)
def create_frame(text, width=1280, height=720):
    img = np.zeros((height, width, 3), dtype=np.uint8)

    # Background color (dark theme)
    img[:] = (15, 23, 42)

    # Split text into lines
    words = text.split()
    lines = []
    line = ""

    for word in words:
        if len(line + word) < 40:
            line += word + " "
        else:
            lines.append(line)
            line = word + " "
    lines.append(line)

    # Draw text
    y = 200
    for l in lines[:5]:  # limit lines
        cv2.putText(
            img,
            l.strip(),
            (100, y),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2,
            cv2.LINE_AA
        )
        y += 60

    return img


# 🎥 Create video (no moviepy)
def create_video(text):
    video_name = f"{uuid.uuid4()}.mp4"
    audio_file = create_audio(text)

    fps = 24
    duration = max(5, len(text) // 20)  # dynamic duration

    frame = create_frame(text)

    height, width, _ = frame.shape

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(video_name, fourcc, fps, (width, height))

    total_frames = fps * duration

    for _ in range(total_frames):
        video.write(frame)

    video.release()

    # ⚠️ Note: This video has no audio (OpenCV limitation)
    # If needed, we can merge audio later

    return video_name