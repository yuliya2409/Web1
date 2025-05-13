class WordView {
    constructor(controller) {
        this.controller = controller;
        this.questions = [];             
        this.initEventListeners();
    }

    initEventListeners() {
        if (window.location.pathname.endsWith('study.html')) {
            this.populateStudyWords();
        }

        if (window.location.pathname.endsWith('quiz.html')) {
            this.generateQuizQuestions();
            this.setupQuizSubmission();
        }
    }

    populateStudyWords() {
        const studyWordsContainer = document.querySelector('.study-words');
        if (!studyWordsContainer) return;

        try {
            const words = this.controller.getRandomWords();
            studyWordsContainer.innerHTML = words.map(word => `
                <div class="col-md-3">
                    <div class="card word-card">
                        <div class="card-body">
                            <h5 class="card-title">${word.english}</h5>
                            <p class="card-text">${word.ukrainian}</p>
                            <p class="card-text text-muted">${word.usage}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error populating study words:', error);
            this.showMessage('Не вдалося завантажити слова', 'danger');
        }
    }

    generateQuizQuestions() {
        const quizContainer = document.querySelector('.quiz-container');
        if (!quizContainer) return;

        try {
            // Генерируем и сохраняем вопросы
            this.questions = this.controller.generateQuizQuestions();

            // Рендерим
            quizContainer.innerHTML = this.questions.map((q, idx) => `
                <div class="quiz-question">
                    <p class="mb-3">${idx + 1}. ${q.question}</p>
                    ${q.options.map((opt, oi) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio"
                                   name="question${idx}"
                                   id="question${idx}_option${oi}"
                                   value="${opt}">
                            <label class="form-check-label" for="question${idx}_option${oi}">
                                ${opt}
                            </label>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        } catch (err) {
            console.error('Error generating quiz questions:', err);
            this.showMessage('Не вдалося створити тест', 'danger');
        }
    }

    setupQuizSubmission() {
        const checkBtn = document.querySelector('.btn-primary');
        if (!checkBtn) return;

        checkBtn.addEventListener('click', () => {
            const questionElems = document.querySelectorAll('.quiz-question');
            let correctCount = 0;

            questionElems.forEach((elem, idx) => {
                const selected = elem.querySelector('input:checked');
                const labels   = elem.querySelectorAll('.form-check-label');
                const correct  = this.questions[idx].correctAnswer;

                // Сбрасываем стили
                labels.forEach(l => l.classList.remove('text-success','text-danger'));

                if (selected) {
                    const label = selected.nextElementSibling;
                    if (selected.value === correct) {
                        label.classList.add('text-success');
                        correctCount++;
                    } else {
                        label.classList.add('text-danger');
                        // подсветить правильный
                        labels.forEach(l => {
                            if (l.textContent.trim() === correct) {
                                l.classList.add('text-success');
                            }
                        });
                    }
                }
            });

            this.showMessage(`Ви правильно відповіли на ${correctCount} з ${this.questions.length} питань`, 'info');
        });
    }

    showMessage(message, type = 'info') {
        let messageContainer = document.getElementById('message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            messageContainer.className = 'fixed-top text-center mt-5 pt-3';
            document.body.insertBefore(messageContainer, document.body.firstChild);
        }

        const messageElement = document.createElement('div');
        messageElement.className = `alert alert-${type} alert-dismissible fade show`;
        messageElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        messageContainer.innerHTML = ''; 
        messageContainer.appendChild(messageElement);
    }
}

export default WordView;