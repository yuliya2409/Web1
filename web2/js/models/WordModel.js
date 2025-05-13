class WordModel {
    constructor() {
        this.words = [
            { english: 'Apple', ukrainian: 'яблуко', usage: 'I eat an apple every day.', translation: 'Я щодня їм яблуко.' },
            { english: 'Book', ukrainian: 'книга', usage: 'This book is very interesting.', translation: 'Ця книга дуже цікава.' },
            { english: 'House', ukrainian: 'будинок', usage: 'Their house is on the hill.', translation: 'Їхній будинок знаходиться на пагорбі.' },
            { english: 'Car', ukrainian: 'автомобіль', usage: 'He drives a fast car.', translation: 'Він водить швидкий автомобіль.' },
            { english: 'Water', ukrainian: 'вода', usage: 'Water is essential for life.', translation: 'Вода необхідна для життя.' },
            { english: 'Table', ukrainian: 'стіл', usage: 'The book is on the table.', translation: 'Книга на столі.' },
            { english: 'Chair', ukrainian: 'стілець', usage: 'He sat on the chair.', translation: 'Він сів на стілець.' },
            { english: 'Sun', ukrainian: 'сонце', usage: 'The sun is shining.', translation: 'Світить сонце.' }
        ];
    }

    getAllWords() {
        return this.words;
    }

    getRandomWords(count = 4) {
        return this._shuffleAndTake(this.words, count);
    }

    _shuffleAndTake(array, count) {
        return [...array]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }

    generateOptions(correctWord) {
        const otherWords = this.words.filter(w => w.english !== correctWord.english);
        const wrongOptions = this._shuffleAndTake(otherWords, 2).map(w => w.ukrainian);
        return [correctWord.ukrainian, ...wrongOptions].sort(() => 0.5 - Math.random());
    }

    generateQuizQuestions(count = 3) {
        const quizWords = this.getRandomWords(count);

        return quizWords.map((word, idx) => ({
            id: idx + 1,
            question: `Що означає слово "${word.english}"?`,
            correctAnswer: word.ukrainian,
            options: this.generateOptions(word)
        }));
    }
}

export default new WordModel();
