document.addEventListener('DOMContentLoaded', () => {
    class Question {
        constructor({ id, text, options, correctOptionId }) {
            this.id = id;
            this.text = text;
            this.options = options;
            this.correctOptionId = correctOptionId;
            this.selectedOptionId = null;
        }
    
        isCorrect() {
            return this.selectedOptionId === this.correctOptionId;
        }
    }
    
    class Quiz {
        constructor(questions, containerId) {
            this.questions = questions.map(question => new Question(question));
            this.score = 0;
            this.container = document.getElementById(containerId);
        }
    
        render() {
            this.container.innerHTML = '';
    
            const fragment = document.createDocumentFragment();
    
            this.questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
    
                const questionText = document.createElement('p');
                questionText.textContent = `${index + 1}. ${question.text}`;
                questionDiv.appendChild(questionText);
    
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';
    
                question.options.forEach(option => {
                    const optionLabel = document.createElement('label');
    
                    const optionInput = document.createElement('input');
                    optionInput.type = 'radio';
                    optionInput.name = `question${question.id}`;
                    optionInput.value = option.id;
                    optionInput.addEventListener('change', () => {
                        question.selectedOptionId = parseInt(optionInput.value);
                    });
    
                    optionLabel.appendChild(optionInput);
                    optionLabel.appendChild(document.createTextNode(option.text));
                    optionsDiv.appendChild(optionLabel);
                    optionsDiv.appendChild(document.createElement('br'));
                });
    
                questionDiv.appendChild(optionsDiv);
                fragment.appendChild(questionDiv);
            });
    
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';
            submitButton.addEventListener('click', () => this.calculateScore());
    
            fragment.appendChild(submitButton);
            this.container.appendChild(fragment);
        }
    
        calculateScore() {
            this.score = 0;
            this.questions.forEach(question => {
                if (question.isCorrect()) {
                    this.score++;
                }
            });
            this.displayResult();
        }
    
        displayResult() {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `Your score is: ${this.score}/${this.questions.length}`;
            this.container.appendChild(resultDiv);
        }
    }
    
    // Sample quiz data
    const quizData = {
        questions: [
            {
                id: 1,
                text: 'Which country won Euro 2024?',
                options: [
                    { id: 1, text: 'France' },
                    { id: 2, text: 'Spain' },
                    { id: 3, text: 'England' }
                ],
                correctOptionId: 2
            },
            {
                id: 2,
                text: 'Which country won Copa America 2024?',
                options: [
                    { id: 1, text: 'Uruguay' },
                    { id: 2, text: 'Colombia' },
                    { id: 3, text: 'Argentina' }
                ],
                correctOptionId: 3
            },
            {
                id: 3,
                text: 'Which European club won the 2024 Champions League final?',
                options: [
                    { id: 1, text: 'Real Madrid' },
                    { id: 2, text: 'Borussia Dortmund' },
                    { id: 3, text: 'Manchester City' }
                ],
                correctOptionId: 1
            }
        ]
    };
    
    // Create and render the quiz
    const quiz = new Quiz(quizData.questions, 'quiz-container');
    quiz.render();


    const quizData2 = {
        questions: [
            {
                id: 1,
                text: 'What is CSS?',
                options: [
                    { id: 1, text: 'Cascading Style Sheets' },
                    { id: 2, text: 'Hypertext Marup Language' },
                    { id: 3, text: 'A functional programming lagnuage' }
                ],
                correctOptionId: 1
            },
            {
                id: 2,
                text: 'What is HTML?',
                options: [
                    { id: 1, text: 'Style sheet' },
                    { id: 2, text: 'Hypertext Markup Language' },
                    { id: 3, text: 'An object oriented programming languge' }
                ],
                correctOptionId: 1
            },        
        ]
    };


        // Create and render the quiz
    const quiz2 = new Quiz(quizData2.questions, 'quiz-container2');
    quiz2.render();
    
});
