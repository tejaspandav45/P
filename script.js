// 1. OPEN THEATER & PLAY MUSIC
function openTheater() {
    const modal = document.getElementById('theater');
    const bgVid = document.getElementById('bgVideo');
    const mainVid = document.getElementById('mainPlayer');
    const bgMusic = document.getElementById('themeSong');

    modal.classList.add('active');
    
    // Video Logic
    bgVid.pause(); 
    mainVid.currentTime = 0;
    mainVid.play();

    // AUDIO LOGIC
    bgMusic.volume = 0.2; 
    bgMusic.play().catch(e => console.log("Audio requires interaction"));

    // GSAP ANIMATIONS
    gsap.from(".section-header, .gold-divider", {
        y: 30, opacity: 0, delay: 0.5, duration: 1
    });

    gsap.from(".fade-in-text", {
        y: 20, opacity: 0, stagger: 0.5, delay: 2, duration: 1
    });

    // UPDATED: Delay drastically reduced (from 5s to 3s) so buttons appear quickly
    gsap.from(".ticket-action-area", {
        scale: 0.9, opacity: 0, delay: 3, duration: 1, ease: "back.out(1.7)"
    });
}

// 2. TOGGLE MUSIC
function toggleMusic() {
    const bgMusic = document.getElementById('themeSong');
    const icon = document.getElementById('musicIcon');
    
    if (bgMusic.paused) {
        bgMusic.play();
        icon.classList.remove('fa-music');
        icon.classList.add('fa-volume-high');
    } else {
        bgMusic.pause();
        icon.classList.remove('fa-volume-high');
        icon.classList.add('fa-music');
    }
}

// 3. CLOSE THEATER
function closeTheater() {
    const modal = document.getElementById('theater');
    const bgVid = document.getElementById('bgVideo');
    const mainVid = document.getElementById('mainPlayer');
    const bgMusic = document.getElementById('themeSong');

    modal.classList.remove('active');
    mainVid.pause();
    bgVid.play();
    bgMusic.pause();
}

// 4. PRINT TICKET
function printTicket() {
    const overlay = document.getElementById('ticket-modal');
    const bgMusic = document.getElementById('themeSong');
    
    gsap.to(overlay, { opacity: 1, duration: 0.3, pointerEvents: "all" });
    
    // Animate Ticket Pop
    gsap.to(".golden-ticket", { 
        scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" 
    });

    // Fade music out
    gsap.to(bgMusic, { volume: 0, duration: 3 });

    setTimeout(() => {
        // Fade out visual
        gsap.to(".theater-modal", { opacity: 0, duration: 2 });
        gsap.to(".video-bg-layer", { opacity: 0, duration: 2 });
        gsap.to(".ticket-overlay", { opacity: 0, duration: 2 });

        // Final Message
        const finalDiv = document.createElement("div");
        finalDiv.style.cssText = `
            position: fixed; inset: 0; background: #000; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            color: #d4af37; font-family: 'Cinzel'; font-size: 1.5rem; opacity: 0;
            text-align: center; line-height: 1.6; padding: 20px;
        `;
        finalDiv.innerHTML = "See you soon.<br><span style='font-size:0.8rem; opacity:0.5'>End of Scene 1</span>";
        document.body.appendChild(finalDiv);
        
        gsap.to(finalDiv, { opacity: 1, duration: 2 });

        // Email
        setTimeout(() => {
             const sub = encodeURIComponent(`PERMANENT SEAT BOOKED 🎟️`);
             const body = encodeURIComponent(
                 `Tejas,\n\nVaishnavi has accepted the ticket.\n\n` +
                 `"Seat V1 Confirmed for Lifetime."`
             );
             window.location.href = `mailto:tpandav93@gmail.com?subject=${sub}&body=${body}`;
        }, 3000);

    }, 3000);
}

// 5. DODGE
function dodge() {
    const btn = document.getElementById('dodge-link');
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 60;
    
    gsap.to(btn, { 
        x: x, 
        y: y, 
        duration: 0.3, 
        ease: "power2.out" 
    });
}
