// PrimeX Workout Generator
class PrimeXGenerator {
    constructor() {
        this.form = document.getElementById('routineForm');
        this.formSection = document.getElementById('formSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.backButton = document.getElementById('backButton');
        this.downloadButton = document.getElementById('downloadButton');
        this.sportSelect = document.getElementById('sport');
        this.materialGroup = document.getElementById('materialGroup');
        this.positionGroup = document.getElementById('positionGroup');
        this.positionSelect = document.getElementById('position');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.progressFill = document.getElementById('progressFill');
        
        this.currentStep = 1;
        this.totalSteps = 6;
        this.currentRoutineData = null;
        this.currentUserData = null;
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.backButton.addEventListener('click', this.showForm.bind(this));
        this.downloadButton.addEventListener('click', this.downloadRoutine.bind(this));
        this.sportSelect.addEventListener('change', this.handleSportChange.bind(this));
        this.nextBtn.addEventListener('click', this.nextStep.bind(this));
        this.prevBtn.addEventListener('click', this.prevStep.bind(this));
        
        // Initialize objectives with default values
        this.updateObjectives();
        
        // Initialize step display
        this.updateStepDisplay();
    }
    
    handleSportChange() {
        const sport = this.sportSelect.value;
        
        // Update objectives based on sport
        this.updateObjectives();
        
        // Update step 5 content based on sport selection
        this.updateStep5Content(sport);
    }
    
    updateStep5Content(sport) {
        const materialGroup = document.getElementById('materialGroup');
        const positionGroup = document.getElementById('positionGroup');
        const noOptionsMessage = document.getElementById('noOptionsMessage');
        
        // Hide all options first
        materialGroup.style.display = 'none';
        positionGroup.style.display = 'none';
        noOptionsMessage.style.display = 'none';
        
        if (sport === 'amrap') {
            materialGroup.style.display = 'block';
        } else if (sport === 'futbol' || sport === 'baloncesto' || sport === 'voley') {
            positionGroup.style.display = 'block';
            this.updatePositions(sport);
        } else if (sport) {
            // Show message for sports that don't have additional options
            noOptionsMessage.style.display = 'block';
        }
    }
    
    updatePositions(sport) {
        const positions = this.getPositionsBySport(sport);
        
        // Clear current options
        this.positionSelect.innerHTML = '<option value="">Selecciona tu posición</option>';
        
        positions.forEach(pos => {
            const option = document.createElement('option');
            option.value = pos.value;
            option.textContent = pos.label;
            this.positionSelect.appendChild(option);
        });
    }
    
    getPositionsBySport(sport) {
        const sportPositions = {
            'futbol': [
                { value: 'portero', label: 'Portero' },
                { value: 'defensa-central', label: 'Defensa Central' },
                { value: 'lateral', label: 'Lateral' },
                { value: 'centrocampista', label: 'Centrocampista' },
                { value: 'extremo', label: 'Extremo' },
                { value: 'delantero', label: 'Delantero' }
            ],
            'baloncesto': [
                { value: 'base', label: 'Base (Point Guard)' },
                { value: 'escolta', label: 'Escolta (Shooting Guard)' },
                { value: 'alero', label: 'Alero (Small Forward)' },
                { value: 'ala-pivot', label: 'Ala-Pívot (Power Forward)' },
                { value: 'pivot', label: 'Pívot (Center)' }
            ],
            'voley': [
                { value: 'colocador', label: 'Colocador/Armador' },
                { value: 'opuesto', label: 'Opuesto' },
                { value: 'receptor', label: 'Receptor/Atacante' },
                { value: 'central', label: 'Central/Bloqueador' },
                { value: 'libero', label: 'Líbero' }
            ]
        };
        
        return sportPositions[sport] || [];
    }
    
    updateObjectives() {
        const objectiveSelect = document.getElementById('objective');
        const sport = this.sportSelect.value;
        
        // Clear current options except the first one
        objectiveSelect.innerHTML = '<option value="">Selecciona tu objetivo</option>';
        
        const objectives = this.getObjectivesBySport(sport);
        
        objectives.forEach(obj => {
            const option = document.createElement('option');
            option.value = obj.value;
            option.textContent = obj.label;
            objectiveSelect.appendChild(option);
        });
    }
    
    getObjectivesBySport(sport) {
        const sportObjectives = {
            'baloncesto': [
                { value: 'mejorar-tiro', label: 'Mejorar Tiro' },
                { value: 'mejorar-pase', label: 'Mejorar Pase' },
                { value: 'control-balon', label: 'Mejorar Control de Balón' },
                { value: 'fuerza-salto', label: 'Aumentar Fuerza y Salto' },
                { value: 'resistencia', label: 'Mejorar Resistencia' }
            ],
            'correr': [
                { value: 'ganar-fondo', label: 'Ganar Fondo' },
                { value: 'ganar-velocidad', label: 'Ganar Velocidad' },
                { value: 'media-maraton', label: 'Media Maratón' },
                { value: '10k', label: '10K' },
                { value: 'maraton', label: 'Maratón' },
                { value: 'sprint', label: 'Sprint/Velocidad' }
            ],
            'futbol': [
                { value: 'mejorar-salto', label: 'Mejorar Salto' },
                { value: 'mejorar-parada', label: 'Mejorar Parada (Porteros)' },
                { value: 'mejorar-tiro', label: 'Mejorar Tiro a Gol' },
                { value: 'mejorar-pase', label: 'Mejorar Pase' },
                { value: 'mejorar-defensa', label: 'Mejorar Defensa' },
                { value: 'resistencia', label: 'Mejorar Resistencia' },
                { value: 'velocidad', label: 'Aumentar Velocidad' },
                { value: 'fuerza', label: 'Aumentar Fuerza' },
                { value: 'agilidad', label: 'Mejorar Agilidad' }
            ],
            'voley': [
                { value: 'mejorar-saque', label: 'Mejorar Saque' },
                { value: 'mejorar-recepcion', label: 'Mejorar Recepción' },
                { value: 'mejorar-ataque', label: 'Mejorar Ataque/Remate' },
                { value: 'mejorar-bloqueo', label: 'Mejorar Bloqueo' },
                { value: 'mejorar-armado', label: 'Mejorar Armado/Colocación' },
                { value: 'salto-vertical', label: 'Mejorar Salto Vertical' },
                { value: 'agilidad', label: 'Mejorar Agilidad' },
                { value: 'resistencia', label: 'Mejorar Resistencia' }
            ],
            'boxeo': [
                { value: 'potencia-golpe', label: 'Aumentar Potencia de Golpe' },
                { value: 'velocidad-manos', label: 'Mejorar Velocidad de Manos' },
                { value: 'resistencia', label: 'Mejorar Resistencia' },
                { value: 'tecnica', label: 'Mejorar Técnica' },
                { value: 'footwork', label: 'Mejorar Juego de Piernas' }
            ],
            'natacion': [
                { value: 'resistencia', label: 'Mejorar Resistencia' },
                { value: 'velocidad', label: 'Aumentar Velocidad' },
                { value: 'tecnica', label: 'Mejorar Técnica' },
                { value: 'fuerza', label: 'Aumentar Fuerza' }
            ]
        };
        
        // Default objectives for sports not specified or general sports
        const defaultObjectives = [
            { value: 'fuerza', label: 'Aumentar Fuerza' },
            { value: 'resistencia', label: 'Mejorar Resistencia' },
            { value: 'perder-grasa', label: 'Perder Grasa' },
            { value: 'tecnica', label: 'Mejorar Técnica' }
        ];
        
        return sportObjectives[sport] || defaultObjectives;
    }
    
    // Step Navigation Methods
    nextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepDisplay();
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
        }
    }
    
    updateStepDisplay() {
        // Update step indicators
        const stepIndicators = document.querySelectorAll('.step-indicator');
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
            }
        });
        
        // Update progress bar
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Show/hide form steps
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update navigation buttons
        this.prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        this.nextBtn.style.display = this.currentStep < this.totalSteps ? 'block' : 'none';
        this.submitBtn.style.display = this.currentStep === this.totalSteps ? 'block' : 'none';
        
        // Handle step 5 content updates
        if (this.currentStep === 5) {
            const sport = this.sportSelect.value;
            this.updateStep5Content(sport);
        }
    }
    
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                field.focus();
                return false;
            }
        }
        
        // Special validation for step 5 (additional options)
        if (this.currentStep === 5) {
            const sport = this.sportSelect.value;
            
            // For AMRAP, at least one material should be selected
            if (sport === 'amrap') {
                const selectedMaterials = document.querySelectorAll('input[name="material"]:checked');
                if (selectedMaterials.length === 0) {
                    alert('Por favor selecciona al menos un tipo de material disponible.');
                    return false;
                }
            }
            
            // For team sports, position should be selected
            if ((sport === 'futbol' || sport === 'baloncesto' || sport === 'voley') && !this.positionSelect.value) {
                this.positionSelect.focus();
                alert('Por favor selecciona tu posición.');
                return false;
            }
        }
        
        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const userData = Object.fromEntries(formData.entries());
        
        // Get selected materials for AMRAP
        if (userData.sport === 'amrap') {
            const materialCheckboxes = this.form.querySelectorAll('input[name="material"]:checked');
            userData.material = Array.from(materialCheckboxes).map(cb => cb.value);
        }
        
        // Get position for team sports
        if (userData.sport === 'futbol' || userData.sport === 'baloncesto' || userData.sport === 'voley') {
            userData.position = this.positionSelect.value;
        }
        
        // Show loading state
        this.toggleLoading(true);
        
        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            const routine = this.generateRoutine(userData);
            this.currentRoutineData = routine;
            this.currentUserData = userData;
            this.displayRoutine(routine, userData);
            this.showResults();
        } catch (error) {
            console.error('Error generating routine:', error);
            alert('Ha ocurrido un error al generar tu rutina. Por favor, intenta nuevamente.');
        } finally {
            this.toggleLoading(false);
        }
    }

    toggleLoading(isLoading) {
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    generateRoutine(userData) {
        const { age, weight, height, level, objective, sport, days } = userData;
        const numDays = parseInt(days);
        
        // Calculate BMI for additional context
        const heightM = parseFloat(height) / 100;
        const bmi = parseFloat(weight) / (heightM * heightM);
        
        // Get sport-specific exercises
        const exercises = this.getExercisesBySport(sport, level, objective, userData.material, userData.position, userData);
        
        // Generate daily routines
        const routine = [];
        for (let i = 1; i <= numDays; i++) {
            const dayExercises = this.selectDayExercises(exercises, i, numDays, level, objective, sport);
            routine.push({
                day: i,
                sport: this.getSportDisplayName(sport),
                exercises: dayExercises,
                type: 'workout'
            });
        }

        // Add rest days if needed
        if (numDays < 7) {
            const restDaysNeeded = Math.floor((7 - numDays) / 2);
            for (let i = 0; i < restDaysNeeded; i++) {
                routine.push({
                    day: numDays + i + 1,
                    type: 'rest',
                    sport: this.getSportDisplayName(sport)
                });
            }
        }

        return {
            routine,
            meta: {
                level,
                objective: this.getObjectiveDisplayName(objective),
                sport: this.getSportDisplayName(sport),
                days: numDays,
                bmi: bmi.toFixed(1)
            }
        };
    }

    getExercisesBySport(sport, level, objective, material = []) {
        const exerciseDatabase = {
            fuerza: {
                principiante: [
                    { name: 'Sentadillas', sets: '3', reps: '8-12' },
                    { name: 'Press de banca', sets: '3', reps: '8-10' },
                    { name: 'Peso muerto', sets: '3', reps: '5-8' },
                    { name: 'Press militar', sets: '3', reps: '8-10' },
                    { name: 'Remo con barra', sets: '3', reps: '8-10' },
                    { name: 'Dominadas asistidas', sets: '3', reps: '5-8' },
                    { name: 'Fondos en paralelas', sets: '3', reps: '6-10' }
                ],
                intermedio: [
                    { name: 'Sentadillas', sets: '4', reps: '6-8' },
                    { name: 'Press de banca', sets: '4', reps: '6-8' },
                    { name: 'Peso muerto', sets: '4', reps: '5-6' },
                    { name: 'Press militar', sets: '4', reps: '6-8' },
                    { name: 'Remo con barra', sets: '4', reps: '6-8' },
                    { name: 'Dominadas', sets: '3', reps: '6-10' },
                    { name: 'Fondos en paralelas', sets: '3', reps: '8-12' },
                    { name: 'Sentadilla frontal', sets: '3', reps: '6-8' }
                ],
                avanzado: [
                    { name: 'Sentadillas', sets: '5', reps: '3-5' },
                    { name: 'Press de banca', sets: '5', reps: '3-5' },
                    { name: 'Peso muerto', sets: '5', reps: '3-5' },
                    { name: 'Press militar', sets: '4', reps: '5-6' },
                    { name: 'Remo con barra', sets: '4', reps: '5-6' },
                    { name: 'Dominadas lastradas', sets: '4', reps: '5-8' },
                    { name: 'Sentadilla frontal', sets: '4', reps: '5-6' },
                    { name: 'Press inclinado', sets: '4', reps: '5-6' }
                ]
            },
            amrap: {
                principiante: [
                    { name: 'Burpees', sets: '3', reps: '5-8', equipment: 'ninguno' },
                    { name: 'Air squats', sets: '3', reps: '10-15', equipment: 'ninguno' },
                    { name: 'Push-ups', sets: '3', reps: '5-10', equipment: 'ninguno' },
                    { name: 'Mountain climbers', sets: '3', reps: '20 seg', equipment: 'ninguno' },
                    { name: 'Kettlebell swings', sets: '3', reps: '10-15', equipment: 'kettlebells' },
                    { name: 'Box step-ups', sets: '3', reps: '10 c/pierna', equipment: 'cajones' },
                    { name: 'Plank hold', sets: '3', reps: '30-45 seg', equipment: 'ninguno' },
                    { name: 'Goblet squats', sets: '3', reps: '8-12', equipment: 'mancuernas' },
                    { name: 'Single unders', sets: '3', reps: '30-50', equipment: 'cuerdas' },
                    { name: 'Wall balls', sets: '3', reps: '10-15', equipment: 'wall-ball' },
                    { name: 'Deadlifts', sets: '3', reps: '5-8', equipment: 'barras' }
                ],
                intermedio: [
                    { name: 'Burpees', sets: '4', reps: '10-15', equipment: 'ninguno' },
                    { name: 'Air squats', sets: '4', reps: '20-25', equipment: 'ninguno' },
                    { name: 'Push-ups', sets: '4', reps: '10-15', equipment: 'ninguno' },
                    { name: 'Double unders', sets: '4', reps: '30-50', equipment: 'cuerdas' },
                    { name: 'Kettlebell swings', sets: '4', reps: '20-25', equipment: 'kettlebells' },
                    { name: 'Box jumps', sets: '3', reps: '10-15', equipment: 'cajones' },
                    { name: 'Wall balls', sets: '4', reps: '15-20', equipment: 'wall-ball' },
                    { name: 'Pull-ups', sets: '3', reps: '5-10', equipment: 'ninguno' },
                    { name: 'Thrusters', sets: '4', reps: '10-15', equipment: 'mancuernas' },
                    { name: 'Front squats', sets: '3', reps: '8-12', equipment: 'barras' }
                ],
                avanzado: [
                    { name: 'Burpees', sets: '5', reps: '15-20', equipment: 'ninguno' },
                    { name: 'Thrusters', sets: '4', reps: '15-20', equipment: 'barras' },
                    { name: 'Muscle-ups', sets: '3', reps: '3-8', equipment: 'ninguno' },
                    { name: 'Double unders', sets: '5', reps: '50-100', equipment: 'cuerdas' },
                    { name: 'Handstand push-ups', sets: '3', reps: '5-10', equipment: 'ninguno' },
                    { name: 'Box jumps', sets: '4', reps: '15-20', equipment: 'cajones' },
                    { name: 'Wall balls', sets: '5', reps: '20-25', equipment: 'wall-ball' },
                    { name: 'Toes to bar', sets: '4', reps: '10-15', equipment: 'ninguno' },
                    { name: 'Clean and press', sets: '4', reps: '6-10', equipment: 'kettlebells' },
                    { name: 'Man makers', sets: '3', reps: '8-12', equipment: 'mancuernas' }
                ]
            },
            futbol: {
                principiante: [
                    { name: 'Sprints 20m', sets: '4', reps: '6 reps' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15' },
                    { name: 'Lunges', sets: '3', reps: '10 c/pierna' },
                    { name: 'Toques de balón', sets: '3', reps: '2 min' },
                    { name: 'Saltos laterales', sets: '3', reps: '15-20' },
                    { name: 'Plancha', sets: '3', reps: '30-45 seg' },
                    { name: 'Trote continuo', sets: '1', reps: '15-20 min' }
                ],
                intermedio: [
                    { name: 'Sprints 30m', sets: '5', reps: '8 reps' },
                    { name: 'Sentadillas con salto', sets: '4', reps: '12-15' },
                    { name: 'Lunges con balón', sets: '3', reps: '12 c/pierna' },
                    { name: 'Toques de balón', sets: '4', reps: '3 min' },
                    { name: 'Agilidad con conos', sets: '4', reps: '45 seg' },
                    { name: 'Elevaciones de talón', sets: '3', reps: '15-20' },
                    { name: 'Carrera intervalos', sets: '1', reps: '25 min' }
                ],
                avanzado: [
                    { name: 'Sprints 40m', sets: '6', reps: '10 reps' },
                    { name: 'Pliometría avanzada', sets: '4', reps: '10-12' },
                    { name: 'Lunges con peso', sets: '4', reps: '12 c/pierna' },
                    { name: 'Técnica con balón', sets: '5', reps: '4 min' },
                    { name: 'Circuito agilidad', sets: '5', reps: '60 seg' },
                    { name: 'Saltos pliométricos', sets: '4', reps: '8-10' },
                    { name: 'Carrera alta intensidad', sets: '1', reps: '30 min' }
                ]
            },
            baloncesto: {
                principiante: [
                    { name: 'Saltos verticales', sets: '3', reps: '8-10', category: 'jumping' },
                    { name: 'Dribbling estático', sets: '3', reps: '2 min', category: 'ball-handling' },
                    { name: 'Tiros libres', sets: '5', reps: '10 tiros', category: 'shooting' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15', category: 'strength' },
                    { name: 'Flexiones', sets: '3', reps: '8-12', category: 'strength' },
                    { name: 'Pases al muro', sets: '4', reps: '30 pases', category: 'passing' },
                    { name: 'Control de balón sentado', sets: '3', reps: '1 min', category: 'ball-handling' },
                    { name: 'Tiros desde corta distancia', sets: '4', reps: '15 tiros', category: 'shooting' },
                    { name: 'Escalera de agilidad', sets: '3', reps: '30 seg', category: 'agility' },
                    { name: 'Trote', sets: '1', reps: '15 min', category: 'endurance' }
                ],
                intermedio: [
                    { name: 'Saltos con peso', sets: '4', reps: '8-10', category: 'jumping' },
                    { name: 'Dribbling dinámico', sets: '4', reps: '3 min', category: 'ball-handling' },
                    { name: 'Tiros en movimiento', sets: '5', reps: '15 tiros', category: 'shooting' },
                    { name: 'Sentadillas con salto', sets: '4', reps: '10-12', category: 'jumping' },
                    { name: 'Flexiones diamante', sets: '3', reps: '10-15', category: 'strength' },
                    { name: 'Pases con movimiento', sets: '4', reps: '2 min', category: 'passing' },
                    { name: 'Combo dribbling', sets: '4', reps: '2 min', category: 'ball-handling' },
                    { name: 'Tiros perimetrales', sets: '5', reps: '20 tiros', category: 'shooting' },
                    { name: 'Shuttle runs', sets: '4', reps: '30 seg', category: 'agility' },
                    { name: 'Intervalos correr', sets: '1', reps: '20 min', category: 'endurance' }
                ],
                avanzado: [
                    { name: 'Pliometría vertical', sets: '5', reps: '6-8', category: 'jumping' },
                    { name: 'Dribbling competitivo', sets: '5', reps: '4 min', category: 'ball-handling' },
                    { name: 'Tiros bajo presión', sets: '6', reps: '20 tiros', category: 'shooting' },
                    { name: 'Sentadillas explosivas', sets: '4', reps: '8-10', category: 'jumping' },
                    { name: 'Flexiones pliométricas', sets: '4', reps: '8-12', category: 'strength' },
                    { name: 'Pases rápidos en trío', sets: '5', reps: '3 min', category: 'passing' },
                    { name: 'Control avanzado 1vs1', sets: '5', reps: '3 min', category: 'ball-handling' },
                    { name: 'Tiros de 3 puntos', sets: '6', reps: '25 tiros', category: 'shooting' },
                    { name: 'Agilidad reactiva', sets: '5', reps: '45 seg', category: 'agility' },
                    { name: 'HIIT específico', sets: '1', reps: '25 min', category: 'endurance' }
                ]
            },
            correr: {
                principiante: [
                    { name: 'Trote base', sets: '1', reps: '20-25 min', category: 'endurance' },
                    { name: 'Caminata rápida', sets: '1', reps: '10 min', category: 'endurance' },
                    { name: 'Sprints suaves 50m', sets: '4', reps: '6 reps', category: 'speed' },
                    { name: 'Estiramientos', sets: '1', reps: '10 min', category: 'flexibility' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15', category: 'strength' },
                    { name: 'Elevación talones', sets: '3', reps: '15-20', category: 'strength' },
                    { name: 'Plancha', sets: '3', reps: '30 seg', category: 'core' },
                    { name: 'Lunges', sets: '3', reps: '10 c/pierna', category: 'strength' },
                    { name: 'Carrera continua suave', sets: '1', reps: '15-20 min', category: 'endurance' },
                    { name: 'Aceleraciones', sets: '4', reps: '30m', category: 'speed' }
                ],
                intermedio: [
                    { name: 'Carrera continua', sets: '1', reps: '30-40 min', category: 'endurance' },
                    { name: 'Intervalos 400m', sets: '6', reps: '2 min desc', category: 'endurance' },
                    { name: 'Sprints 100m', sets: '6', reps: '15 seg desc', category: 'speed' },
                    { name: 'Técnica de carrera', sets: '3', reps: '2 min', category: 'technique' },
                    { name: 'Sentadillas con salto', sets: '4', reps: '10-12', category: 'strength' },
                    { name: 'Elevaciones de rodilla', sets: '3', reps: '20-25', category: 'technique' },
                    { name: 'Core avanzado', sets: '4', reps: '45 seg', category: 'core' },
                    { name: 'Fartlek', sets: '1', reps: '25 min', category: 'endurance' },
                    { name: 'Tempo run', sets: '1', reps: '20 min', category: 'endurance' },
                    { name: 'Series 200m', sets: '8', reps: '90 seg desc', category: 'speed' }
                ],
                avanzado: [
                    { name: 'Carrera larga', sets: '1', reps: '50-70 min', category: 'endurance' },
                    { name: 'Intervalos 800m', sets: '5', reps: '3 min desc', category: 'endurance' },
                    { name: 'Sprints en cuesta', sets: '8', reps: '15 seg', category: 'speed' },
                    { name: 'Pliometría running', sets: '4', reps: '8-10', category: 'strength' },
                    { name: 'Técnica avanzada', sets: '4', reps: '3 min', category: 'technique' },
                    { name: 'Core específico', sets: '5', reps: '60 seg', category: 'core' },
                    { name: 'Tempo run largo', sets: '1', reps: '35-45 min', category: 'endurance' },
                    { name: 'Series 1000m', sets: '4', reps: '4 min desc', category: 'endurance' },
                    { name: 'Sprints máximos', sets: '6', reps: '60m', category: 'speed' },
                    { name: 'Carrera continua fuerte', sets: '1', reps: '60-90 min', category: 'endurance' }
                ]
            },
            voley: {
                principiante: [
                    { name: 'Salto vertical', sets: '3', reps: '8-10', category: 'salto', position: 'all' },
                    { name: 'Pase de dedos básico', sets: '3', reps: '50 pases', category: 'armado', position: 'colocador' },
                    { name: 'Recepción básica', sets: '3', reps: '30 recepciones', category: 'recepcion', position: 'all' },
                    { name: 'Saque por debajo', sets: '3', reps: '15 saques', category: 'saque', position: 'all' },
                    { name: 'Ataque desde zona 4', sets: '3', reps: '10 ataques', category: 'ataque', position: 'receptor,opuesto' },
                    { name: 'Bloqueo individual', sets: '3', reps: '15 bloqueos', category: 'bloqueo', position: 'central,receptor' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15', category: 'fuerza', position: 'all' },
                    { name: 'Flexiones', sets: '3', reps: '8-12', category: 'fuerza', position: 'all' },
                    { name: 'Desplazamientos laterales', sets: '3', reps: '2 min', category: 'agilidad', position: 'all' },
                    { name: 'Defensa baja', sets: '3', reps: '20 defensas', category: 'recepcion', position: 'libero' },
                    { name: 'Cardio básico', sets: '1', reps: '15 min', category: 'resistencia', position: 'all' }
                ],
                intermedio: [
                    { name: 'Saltos con bloqueo', sets: '4', reps: '10-12', category: 'salto', position: 'all' },
                    { name: 'Pase de dedos dinámico', sets: '4', reps: '3 min', category: 'armado', position: 'colocador' },
                    { name: 'Recepción en movimiento', sets: '4', reps: '2 min', category: 'recepcion', position: 'all' },
                    { name: 'Saque por arriba', sets: '4', reps: '20 saques', category: 'saque', position: 'all' },
                    { name: 'Ataque variado', sets: '4', reps: '15 ataques', category: 'ataque', position: 'receptor,opuesto' },
                    { name: 'Bloqueo doble', sets: '4', reps: '12 bloqueos', category: 'bloqueo', position: 'central,receptor' },
                    { name: 'Sentadillas explosivas', sets: '4', reps: '10-12', category: 'fuerza', position: 'all' },
                    { name: 'Flexiones diamante', sets: '3', reps: '10-15', category: 'fuerza', position: 'all' },
                    { name: 'Agilidad lateral avanzada', sets: '4', reps: '45 seg', category: 'agilidad', position: 'all' },
                    { name: 'Defensa en red', sets: '4', reps: '3 min', category: 'recepcion', position: 'libero' },
                    { name: 'Intervalos de resistencia', sets: '1', reps: '25 min', category: 'resistencia', position: 'all' }
                ],
                avanzado: [
                    { name: 'Pliometría específica', sets: '5', reps: '8-10', category: 'salto', position: 'all' },
                    { name: 'Armado competitivo', sets: '5', reps: '4 min', category: 'armado', position: 'colocador' },
                    { name: 'Recepción bajo presión', sets: '5', reps: '3 min', category: 'recepcion', position: 'all' },
                    { name: 'Saque flotante y potente', sets: '5', reps: '25 saques', category: 'saque', position: 'all' },
                    { name: 'Ataque de precisión', sets: '5', reps: '20 ataques', category: 'ataque', position: 'receptor,opuesto' },
                    { name: 'Bloqueo reactivo', sets: '5', reps: '15 bloqueos', category: 'bloqueo', position: 'central,receptor' },
                    { name: 'Saltos con peso', sets: '4', reps: '8-10', category: 'fuerza', position: 'all' },
                    { name: 'Flexiones pliométricas', sets: '4', reps: '8-12', category: 'fuerza', position: 'all' },
                    { name: 'Reacciones rápidas', sets: '5', reps: '60 seg', category: 'agilidad', position: 'all' },
                    { name: 'Defensa espectacular', sets: '5', reps: '4 min', category: 'recepcion', position: 'libero' },
                    { name: 'HIIT voleibol', sets: '1', reps: '30 min', category: 'resistencia', position: 'all' }
                ]
            },
            natacion: {
                principiante: [
                    { name: 'Nado libre', sets: '4', reps: '50m' },
                    { name: 'Patada con tabla', sets: '3', reps: '25m' },
                    { name: 'Brazos solo', sets: '3', reps: '25m' },
                    { name: 'Técnica respiración', sets: '3', reps: '2 min' },
                    { name: 'Flexiones en seco', sets: '3', reps: '8-12' },
                    { name: 'Plancha', sets: '3', reps: '30 seg' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15' }
                ],
                intermedio: [
                    { name: 'Nado libre', sets: '6', reps: '100m' },
                    { name: 'Espalda', sets: '4', reps: '50m' },
                    { name: 'Intervalos 50m', sets: '8', reps: '15 seg desc' },
                    { name: 'Patada vertical', sets: '3', reps: '30 seg' },
                    { name: 'Pull-ups', sets: '3', reps: '5-8' },
                    { name: 'Core acuático', sets: '4', reps: '45 seg' },
                    { name: 'Sprints 25m', sets: '6', reps: 'máx velocidad' }
                ],
                avanzado: [
                    { name: 'Nado libre', sets: '8', reps: '200m' },
                    { name: 'Medley individual', sets: '4', reps: '100m' },
                    { name: 'Intervalos 100m', sets: '6', reps: '20 seg desc' },
                    { name: 'Hipóxicos', sets: '4', reps: '75m' },
                    { name: 'Fuerza específica', sets: '4', reps: '10-12' },
                    { name: 'Core avanzado', sets: '5', reps: '60 seg' },
                    { name: 'Sprints competitivos', sets: '8', reps: '25m' }
                ]
            },
            calistenia: {
                principiante: [
                    { name: 'Flexiones', sets: '3', reps: '5-10' },
                    { name: 'Sentadillas', sets: '3', reps: '10-15' },
                    { name: 'Plancha', sets: '3', reps: '20-30 seg' },
                    { name: 'Dominadas asistidas', sets: '3', reps: '3-5' },
                    { name: 'Fondos en banco', sets: '3', reps: '5-8' },
                    { name: 'Lunges', sets: '3', reps: '8 c/pierna' },
                    { name: 'Mountain climbers', sets: '3', reps: '15 seg' }
                ],
                intermedio: [
                    { name: 'Flexiones diamante', sets: '4', reps: '8-12' },
                    { name: 'Sentadillas pistol asistidas', sets: '3', reps: '5 c/pierna' },
                    { name: 'Plancha lateral', sets: '3', reps: '30 seg c/lado' },
                    { name: 'Dominadas', sets: '4', reps: '5-8' },
                    { name: 'Fondos en paralelas', sets: '4', reps: '6-10' },
                    { name: 'L-sit hold', sets: '3', reps: '10-15 seg' },
                    { name: 'Burpees', sets: '3', reps: '8-12' }
                ],
                avanzado: [
                    { name: 'Flexiones a una mano', sets: '3', reps: '3-5 c/mano' },
                    { name: 'Sentadillas pistol', sets: '4', reps: '5-8 c/pierna' },
                    { name: 'Plancha frontal', sets: '3', reps: '15-30 seg' },
                    { name: 'Muscle-ups', sets: '3', reps: '3-5' },
                    { name: 'Handstand push-ups', sets: '3', reps: '5-8' },
                    { name: 'L-sit', sets: '4', reps: '20-30 seg' },
                    { name: 'Human flag progresión', sets: '3', reps: '5-10 seg' }
                ]
            },
            boxeo: {
                principiante: [
                    { name: 'Sombra básica', sets: '3', reps: '2 min' },
                    { name: 'Combinaciones básicas', sets: '4', reps: '1 min' },
                    { name: 'Salto de cuerda', sets: '3', reps: '1 min' },
                    { name: 'Flexiones', sets: '3', reps: '8-12' },
                    { name: 'Sentadillas', sets: '3', reps: '12-15' },
                    { name: 'Plancha', sets: '3', reps: '30 seg' },
                    { name: 'Saco pesado', sets: '3', reps: '1 min' }
                ],
                intermedio: [
                    { name: 'Sombra técnica', sets: '4', reps: '3 min' },
                    { name: 'Combinaciones avanzadas', sets: '5', reps: '2 min' },
                    { name: 'Salto de cuerda', sets: '4', reps: '2 min' },
                    { name: 'Flexiones explosivas', sets: '4', reps: '8-12' },
                    { name: 'Sentadillas con salto', sets: '4', reps: '10-12' },
                    { name: 'Core boxeo', sets: '4', reps: '45 seg' },
                    { name: 'Saco pesado', sets: '5', reps: '2 min' }
                ],
                avanzado: [
                    { name: 'Sombra competitiva', sets: '6', reps: '3 min' },
                    { name: 'Sparring técnico', sets: '5', reps: '3 min' },
                    { name: 'Salto cuerda avanzado', sets: '5', reps: '3 min' },
                    { name: 'Pliometría upper', sets: '4', reps: '8-10' },
                    { name: 'Trabajo de piernas', sets: '5', reps: '2 min' },
                    { name: 'Core específico', sets: '5', reps: '60 seg' },
                    { name: 'Saco pesado intenso', sets: '6', reps: '3 min' }
                ]
            }
        };

        let availableExercises = exerciseDatabase[sport]?.[level] || exerciseDatabase.fuerza.principiante;
        
        // Filter exercises based on available material for AMRAP
        if (sport === 'amrap' && material && material.length > 0) {
            availableExercises = availableExercises.filter(exercise => 
                !exercise.equipment || material.includes(exercise.equipment)
            );
        }
        
        return availableExercises;
    }

    selectDayExercises(exercises, day, totalDays, level, objective, sport) {
        const exercisesPerDay = this.getExercisesPerDay(level, totalDays);
        
        // Filter exercises based on objective if specific
        let filteredExercises = this.filterExercisesByObjective(exercises, objective, sport);
        
        // Shuffle and select exercises
        const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
        
        // Select exercises based on day pattern
        let selectedExercises = [];
        const startIndex = ((day - 1) * 2) % filteredExercises.length;
        
        for (let i = 0; i < exercisesPerDay; i++) {
            const index = (startIndex + i) % shuffled.length;
            selectedExercises.push(shuffled[index]);
        }

        // Adjust intensity based on objective
        return selectedExercises.map(exercise => ({
            ...exercise,
            sets: this.adjustSetsForObjective(exercise.sets, objective),
            reps: this.adjustRepsForObjective(exercise.reps, objective)
        }));
    }
    
    filterExercisesByObjective(exercises, objective, sport) {
        // For sports with specific objectives, filter exercises
        if (sport === 'baloncesto') {
            if (objective === 'mejorar-tiro') {
                const shootingExercises = exercises.filter(ex => ex.category === 'shooting');
                // Add some strength and jumping exercises to complement shooting
                const supportExercises = exercises.filter(ex => ex.category === 'jumping' || ex.category === 'strength').slice(0, 2);
                return [...shootingExercises, ...supportExercises];
            }
            if (objective === 'mejorar-pase') {
                const passingExercises = exercises.filter(ex => ex.category === 'passing');
                const supportExercises = exercises.filter(ex => ex.category === 'agility' || ex.category === 'strength').slice(0, 2);
                return [...passingExercises, ...supportExercises];
            }
            if (objective === 'control-balon') {
                const ballHandlingExercises = exercises.filter(ex => ex.category === 'ball-handling');
                const supportExercises = exercises.filter(ex => ex.category === 'agility' || ex.category === 'strength').slice(0, 2);
                return [...ballHandlingExercises, ...supportExercises];
            }
            if (objective === 'fuerza-salto') {
                return exercises.filter(ex => ex.category === 'jumping' || ex.category === 'strength');
            }
            if (objective === 'resistencia') {
                return exercises.filter(ex => ex.category === 'endurance' || ex.category === 'agility');
            }
        }
        
        if (sport === 'correr') {
            if (objective === 'ganar-velocidad' || objective === 'sprint') {
                const speedExercises = exercises.filter(ex => ex.category === 'speed');
                const supportExercises = exercises.filter(ex => ex.category === 'strength' || ex.category === 'core').slice(0, 2);
                return [...speedExercises, ...supportExercises];
            }
            if (objective === 'ganar-fondo' || objective === 'maraton' || objective === '10k' || objective === 'media-maraton') {
                const enduranceExercises = exercises.filter(ex => ex.category === 'endurance');
                const supportExercises = exercises.filter(ex => ex.category === 'core' || ex.category === 'strength').slice(0, 2);
                return [...enduranceExercises, ...supportExercises];
            }
        }
        
        // Return all exercises if no specific filter applies
        return exercises;
    }

    getExercisesPerDay(level, totalDays) {
        const baseExercises = {
            'principiante': 4,
            'intermedio': 5,
            'avanzado': 6
        };
        
        let exercises = baseExercises[level] || 4;
        
        // Adjust based on training frequency
        if (totalDays >= 5) exercises += 1;
        if (totalDays <= 2) exercises -= 1;
        
        return Math.max(3, Math.min(7, exercises));
    }

    adjustSetsForObjective(originalSets, objective) {
        const multipliers = {
            'fuerza': 1.1,
            'resistencia': 1.2,
            'perder-grasa': 1.15,
            'tecnica': 0.9
        };
        
        const multiplier = multipliers[objective] || 1;
        const sets = parseInt(originalSets);
        return Math.max(2, Math.round(sets * multiplier)).toString();
    }

    adjustRepsForObjective(originalReps, objective) {
        if (originalReps.includes('min') || originalReps.includes('seg')) {
            return originalReps; // Don't adjust time-based exercises
        }
        
        const adjustments = {
            'fuerza': (reps) => reps.replace(/(\d+)-(\d+)/, (match, min, max) => 
                `${Math.max(3, parseInt(min) - 2)}-${Math.max(5, parseInt(max) - 2)}`),
            'resistencia': (reps) => reps.replace(/(\d+)-(\d+)/, (match, min, max) => 
                `${parseInt(min) + 3}-${parseInt(max) + 5}`),
            'perder-grasa': (reps) => reps.replace(/(\d+)-(\d+)/, (match, min, max) => 
                `${parseInt(min) + 2}-${parseInt(max) + 3}`),
            'tecnica': (reps) => reps
        };
        
        const adjustment = adjustments[objective] || ((reps) => reps);
        return adjustment(originalReps);
    }

    displayRoutine(routineData, userData) {
        const summaryElement = document.getElementById('routineSummary');
        const daysElement = document.getElementById('routineDays');
        
        // Display summary
        summaryElement.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-label">Deporte</div>
                    <div class="summary-value">${routineData.meta.sport}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Nivel</div>
                    <div class="summary-value">${routineData.meta.level.charAt(0).toUpperCase() + routineData.meta.level.slice(1)}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Objetivo</div>
                    <div class="summary-value">${routineData.meta.objective}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Días/semana</div>
                    <div class="summary-value">${routineData.meta.days} días</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">IMC</div>
                    <div class="summary-value">${routineData.meta.bmi}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Edad</div>
                    <div class="summary-value">${userData.age} años</div>
                </div>
            </div>
        `;
        
        // Display routine days
        daysElement.innerHTML = routineData.routine.map(day => {
            if (day.type === 'rest') {
                return `
                    <div class="day-card rest-day fade-in">
                        <h3>Día ${day.day} - Descanso</h3>
                        <p>Día de recuperación activa. Camina 20-30 minutos o realiza estiramientos suaves.</p>
                    </div>
                `;
            }
            
            return `
                <div class="day-card fade-in">
                    <div class="day-header">
                        <div class="day-number">${day.day}</div>
                        <h3 class="day-title">Día ${day.day} - ${day.sport}</h3>
                    </div>
                    <div class="exercise-list">
                        ${day.exercises.map(exercise => `
                            <div class="exercise-item">
                                <div class="exercise-name">${exercise.name}</div>
                                <div class="exercise-specs">${exercise.sets} series × ${exercise.reps}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    downloadRoutine() {
        if (!this.currentRoutineData || !this.currentUserData) {
            alert('No hay rutina para descargar');
            return;
        }
        
        const content = this.generateRoutineText();
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rutina-primex-${this.currentUserData.sport}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    generateRoutineText() {
        const { currentRoutineData: routineData, currentUserData: userData } = this;
        let content = `RUTINA PRIMEX - ${routineData.meta.sport.toUpperCase()}\n`;
        content += `================================================\n\n`;
        content += `DATOS DEL USUARIO:\n`;
        content += `- Edad: ${userData.age} años\n`;
        content += `- Peso: ${userData.weight} kg\n`;
        content += `- Altura: ${userData.height} cm\n`;
        content += `- Nivel: ${routineData.meta.level}\n`;
        content += `- Objetivo: ${routineData.meta.objective}\n`;
        content += `- Deporte: ${routineData.meta.sport}\n`;
        content += `- Días por semana: ${routineData.meta.days}\n`;
        content += `- IMC: ${routineData.meta.bmi}\n`;
        
        if (userData.sport === 'amrap' && userData.material) {
            content += `- Material disponible: ${userData.material.join(', ')}\n`;
        }
        
        content += `\n================================================\n\n`;
        
        routineData.routine.forEach(day => {
            if (day.type === 'rest') {
                content += `DÍA ${day.day} - DESCANSO\n`;
                content += `- Recuperación activa: caminar, estiramientos suaves o yoga\n\n`;
            } else {
                content += `DÍA ${day.day} - ${day.sport.toUpperCase()}\n`;
                content += `${'-'.repeat(30)}\n`;
                day.exercises.forEach(exercise => {
                    content += `• ${exercise.name}: ${exercise.sets} series x ${exercise.reps}\n`;
                });
                content += `\n`;
            }
        });
        
        content += `\n================================================\n`;
        content += `Rutina generada por PrimeX - ${new Date().toLocaleDateString()}\n`;
        content += `¡Entrena como un profesional!`;
        
        return content;
    }

    showResults() {
        this.formSection.style.display = 'none';
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showForm() {
        this.resultsSection.style.display = 'none';
        this.formSection.style.display = 'block';
        this.formSection.scrollIntoView({ behavior: 'smooth' });
        
        // Reset to first step when returning to form
        this.currentStep = 1;
        this.updateStepDisplay();
        
        // Reset form
        this.form.reset();
        this.materialGroup.style.display = 'none';
        this.positionGroup.style.display = 'none';
        document.getElementById('noOptionsMessage').style.display = 'none';
        
        // Reset objectives to default
        this.updateObjectives();
    }

    getSportDisplayName(sport) {
        const sportNames = {
            'fuerza': 'Entrenamiento de Fuerza',
            'amrap': 'AMRAP / CrossFit',
            'futbol': 'Fútbol',
            'baloncesto': 'Baloncesto',
            'correr': 'Running',
            'voley': 'Vóley',
            'natacion': 'Natación',
            'calistenia': 'Calistenia',
            'boxeo': 'Boxeo'
        };
        return sportNames[sport] || sport;
    }

    getObjectiveDisplayName(objective) {
        const objectiveNames = {
            // General objectives
            'fuerza': 'Aumentar Fuerza',
            'resistencia': 'Mejorar Resistencia',
            'perder-grasa': 'Perder Grasa',
            'tecnica': 'Mejorar Técnica',
            
            // Basketball specific
            'mejorar-tiro': 'Mejorar Tiro',
            'mejorar-pase': 'Mejorar Pase',
            'control-balon': 'Mejorar Control de Balón',
            'fuerza-salto': 'Aumentar Fuerza y Salto',
            
            // Running specific
            'ganar-fondo': 'Ganar Fondo',
            'ganar-velocidad': 'Ganar Velocidad',
            'media-maraton': 'Media Maratón',
            '10k': '10K',
            'maraton': 'Maratón',
            'sprint': 'Sprint/Velocidad',
            
            // Other sports
            'velocidad': 'Aumentar Velocidad',
            'agilidad': 'Mejorar Agilidad',
            'salto-vertical': 'Mejorar Salto Vertical',
            'tecnica-saque': 'Mejorar Técnica de Saque',
            'recepcion': 'Mejorar Recepción',
            'potencia-golpe': 'Aumentar Potencia de Golpe',
            'velocidad-manos': 'Mejorar Velocidad de Manos',
            'footwork': 'Mejorar Juego de Piernas'
        };
        return objectiveNames[objective] || objective;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PrimeXGenerator();
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Future PWA implementation
        console.log('PrimeX ready for PWA enhancement');
    });
}
