const getLocalIP = async () => {
    if (typeof window === "undefined") return; // Ensure it's running in the browser

    return new Promise((resolve, reject) => {
        const peerConnection = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

        peerConnection.createDataChannel(""); // Needed for WebRTC connection
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                const ipRegex = /(\d+\.\d+\.\d+\.\d+)/;
                const match = ipRegex.exec(event.candidate.candidate);
                if (match) {
                    resolve(match[1]); // Extract local IP
                }
            }
        };

        peerConnection.createOffer()
            .then(offer => peerConnection.setLocalDescription(offer))
            .catch(reject);
    });
};

if (typeof window !== "undefined") {
    getLocalIP()
        .then(ip => console.log("Local IP:", ip))
        .catch(console.error);
}

export default getLocalIP;