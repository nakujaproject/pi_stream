# Raspberry Pi Zero 2W Camera Streaming Setup

## 1. Introduction
The Raspberry Pi Zero 2W is a compact and microcomputer that supports camera modules for applications such as surveillance, streaming, and computer vision. This document outlines the setup process for a real-time streaming system with local video recording and remote access.

## 2. Aim/Objectives
### **Aim:**
To configure a Raspberry Pi Zero 2W as a camera streaming device with recording and remote access to base station over WiFi.

### **Objectives:**
- Install Raspberry Pi OS and required dependencies.
- Set up and test the Raspberry Pi camera module.
- Clone the Nakujaproject pi_stream Git repository stream_with_saver Branch 
- Install nvm for managing npm(Node.js)
- Implement a streaming server using Node.js.
- Enable local video recording with unique filenames.
- Push project files to GitHub for version control.
- Stream video remotely using http.

## 3. Theoretical Review
### **Key Concepts:**
- **Embedded Systems & IoT:** The Raspberry Pi as a camera processing unit.
- **Node.js for Web Streaming:** Using Express.js and `fluent-ffmpeg` for MJPEG streaming.
- **FFmpeg for Video Processing:** Encoding, compressing, and saving video files.
- **Git Version Control:** Tracking project progress and maintaining backups.
- **Networking & Streaming Protocols:** Streaming via HTTP and remote access through VLC.

## 4. Installation & Setup Procedure

### **Step 1: Installing Raspberry Pi OS on SD Card**
1. Download **Raspberry Pi OS (Buster)** from the official website.
2. Flash the OS onto a **microSD card** using **Raspberry Pi Imager** or **balenaEtcher**.
3. Enable SSH by adding an empty `ssh` file in the **boot partition**.
4. Configure WiFi by adding a `wpa_supplicant.conf` file with network credentials.
5. Insert the SD card into the Raspberry Pi and power it on.

### **Step 2: Enabling & Testing the Camera**
1. Enable the **camera module** using:
   ```sh
   sudo raspi-config
   ```
2. Verify camera detection:
   ```sh
   vcgencmd get_camera
   ```
   Expected output: `supported=1 detected=1`
3. Capture a test image:
   ```sh
   raspistill -o test.jpg
   ```
4. Record a short video:
   ```sh
   raspivid -t 5000 -o test.h264
   ```
5. If issues arise, check logs using:
   ```sh
   dmesg | grep imx
   ```

### **Step 3: Installing Dependencies**
1. Update system packages:
   ```sh
   sudo apt update && sudo apt upgrade
   ```
2. Install necessary libraries:
   ```sh
   sudo apt install python3-picamera ffmpeg
   ```
3. Install Node.js using `nvm` for version control:
   ```sh
   curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   source ~/.bashrc
   nvm install 16
   ```
4. Install required npm packages:
   ```sh
   npm install express fluent-ffmpeg
   ```
5. Install git:
   ```sh
   sudo apt-get install git
   ```
   
### **Step 4: Setting Up Streaming Server**
1. Clone `pi_stream` - `stream_with_saver` branch :
   ```sh
   git clone -b stream_with_saver https://github.com/nakujaproject/pi_stream.git 
   ```
   or 
   ```sh
   git clone --branch stream_with_saver https://github.com/nakujaproject/pi_stream.git
   ```
2. Run the server:
   ```sh
   node index_save.js
   ```
3. Access the stream in a browser:
   ```
   http://<Pi-IP>:3000/stream.mjpg
   ```

### **Step 5: Saving Video Streams to SD Card**
1. Modify `index.js` to save video streams:
   ```javascript
   const { spawn } = require('child_process');
   const filename = `/home/pi/videos/stream_${Date.now()}.mp4`;
   const ffmpeg = spawn('ffmpeg', ['-i', '/stream.mjpg', filename]);
   ```
2. Ensure recordings are stored uniquely in `/home/pi/videos`.

 ```

## 5. Discussion
The setup process was successful, enabling real-time camera streaming, video recording, and remote access over wifi to base station. Several challenges were encountered, such as Node.js versioning issues, Git push errors, and VLC playback optimizations. These were resolved by using `nvm`, ensuring unique filenames for recordings, and adjusting encoding settings.

## 6. Conclusion & Recommendations
### **Conclusion:**
The Raspberry Pi Zero 2W was successfully configured for real-time camera streaming with video recording and remote-basestation accessibility. The system was deployed with GitHub integration for version control.

### **Recommendations:**
- Implement a **web UI** for stream control.-done 
- Optimize video compression to **save storage**.-done ffmpeg was used 

---
This document provides a structured guide to setting up a Raspberry Pi Zero 2W camera streaming system, ensuring reliability and ease of use. 🚀