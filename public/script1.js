<script>
        const breathCircle = document.getElementById('breathCircle');
        const startButton = document.getElementById('startButton');
        const timerDisplay = document.getElementById('timerDisplay');
        let isBreathing = false;
        let startTime;
        let timerInterval;

        function toggleBreathing() {
            if (isBreathing) {
                stopBreathing();
            } else {
                startBreathing();
            }
        }

        function startBreathing() {
            isBreathing = true;
            startButton.textContent = 'Stop';
            startTime = Date.now();
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            breathe(); // Start the breathing cycle
        }

        function stopBreathing() {
            isBreathing = false;
            breathCircle.style.transform = 'scale(1)'; // Reset circle size
            breathCircle.textContent = 'Click Start';
            startButton.textContent = 'Start';
            clearInterval(timerInterval);
        }

        function updateTimer() {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
            const seconds = (elapsedTime % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `Session time: ${minutes}:${seconds}`;
        }

        function breathe() {
            if (!isBreathing) return;

            // Inhale
            breathCircle.style.transform = 'scale(1.5)';
            breathCircle.textContent = 'Inhale';
            
            setTimeout(() => {
                if (!isBreathing) return;
                // Hold
                breathCircle.textContent = 'Hold';
                
                setTimeout(() => {
                    if (!isBreathing) return;
                    // Exhale
                    breathCircle.style.transform = 'scale(1)';
                    breathCircle.textContent = 'Exhale';
                    
                    setTimeout(() => {
                        if (isBreathing) {
                            breathe(); // Repeat the breathing cycle
                        }
                    }, 4000); // Exhale for 4 seconds
                }, 4000); // Hold for 4 seconds
            }, 4000); // Inhale for 4 seconds
        }
    </script>

                            
                           

  

       