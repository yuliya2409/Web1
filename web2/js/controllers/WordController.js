import WordModel from '../models/WordModel.js';

class WordController {
    constructor() {
        this.model = WordModel;
    }

    getAllWords() {
        return this.model.getAllWords();
    }

    getRandomWords(count = 4) {
        return this.model.getRandomWords(count);
    }

    generateQuizQuestions(count = 3) {
        return this.model.generateQuizQuestions(count);
    }

    getQuizCorrectAnswer(questionIndex) {
        return this.model.getQuizCorrectAnswer(questionIndex);
    }

    addWord(wordData) {
        this.validateWordData(wordData);
        throw new Error('Додавання слів наразі не підтримується');
    }

    validateWordData(wordData) {
        const requiredFields = ['english', 'ukrainian', 'usage', 'translation'];
        
        requiredFields.forEach(field => {
            if (!wordData[field]) {
                throw new Error(`Поле ${field} є обов'язковим`);
            }
        });

        if (wordData.english.length < 1 || wordData.ukrainian.length < 1) {
            throw new Error('Слова не можуть бути порожніми');
        }
    }
}

export default new WordController();