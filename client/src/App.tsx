import { FC, SyntheticEvent, useState, useEffect } from 'react';
import './app.styles.css';
import { v4 as uuid } from 'uuid';
import { mockData as DATA } from './assets/mockData';

const App: FC = () => {
    type QuestionT = typeof DATA[0];
    type StateT = { currentScore: number; completedList: Array<string>; currentQuestion?: QuestionT };

    const [state, setState] = useState<StateT>({
        currentScore: 0,
        completedList: [],
    });

    useEffect(() => {
        console.log('🚀 ~ file: App.tsx:14 ~ state:', state);
    }, [state.completedList.length, state.currentQuestion]);
    const getQuestion = (questionId?: string) => {
        if (questionId) {
            const question = DATA.find((q) => q?.id === questionId);
            return question;
        } else {
            const remainingQuestions = DATA.filter((q) => !state.completedList.includes(q.id));
            return remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
        }
    };
    const nextQuestion = () => {
        const question = getQuestion();
        console.log('🚀 ~ file: App.tsx:27 ~ setState ~ prevState:', state);
        if (question) {
            setState((prevState) => {
                const currentQuestionId = prevState.currentQuestion?.id as string;
                return {
                    ...prevState,
                    // currentScore: prevState.currentScore + question.score,
                    completedList: [...prevState.completedList, currentQuestionId],
                    currentQuestion: question,
                };
            });
        }
    };
    const previousQuestion = () => {
        const listCopy = state.completedList;
        const lastQuestion = getQuestion(listCopy[listCopy.length - 1]);
        if (lastQuestion) {
            setState((prevState) => {
                listCopy.pop();
                return {
                    ...prevState,
                    // currentScore: prevState.currentScore - lastQuestion.score,
                    completedList: [...listCopy],
                    currentQuestion: lastQuestion,
                };
            });
        }
    };
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        console.log('🚀 ~ file: App.tsx:58 ~ handleSubmit ~ event:', event);

        event.preventDefault();
        const buttonClicked = event.nativeEvent.submitter as HTMLButtonElement;
        console.log(state.currentQuestion);
        switch (buttonClicked.value) {
            case 'start':
                setState((prevState) => ({ ...prevState, currentQuestion: getQuestion() }));
                break;
            case 'next':
                nextQuestion();
                break;
            case 'previous':
                previousQuestion();
                break;
            default:
                break;
        }
    };

    return (
        <div className="h-screen w-100">
            <div className="h-full pt-32">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
                    <div className="min-h-96 w-3/4 bg-slate-200 mt-12 p-4 pb-8">
                        <h2 className="text-center text-2xl mb-8">
                            {state.currentQuestion ? state.currentQuestion.question : 'Beginning Prompt'}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center relative">
                            {state.currentQuestion &&
                                state.currentQuestion.response.map((obj: typeof state.currentQuestion.response[0]) => (
                                    <div key={uuid()} className="w-4/5 bg-white px-8 py-10 mb-2">
                                        <input type="radio" name="answer" id="answer" value={obj.score} />
                                        <label className="px-2" htmlFor="answer">
                                            {obj.answer}
                                        </label>
                                    </div>
                                ))}

                            <div className="flex justify-around flex-row-reverse w-1/2 mt-3">
                                {state.currentQuestion ? (
                                    <>
                                        <button
                                            type="submit"
                                            value="next"
                                            className="bg-slate-700 text-white px-4 py-2"
                                        >
                                            Next Question
                                        </button>
                                        <button
                                            type="submit"
                                            value="previous"
                                            className="bg-slate-700 text-white px-4 py-2"
                                        >
                                            Previous Question
                                        </button>
                                    </>
                                ) : (
                                    <button type="submit" value="start" className="bg-slate-700 text-white px-4 py-2">
                                        Get Started
                                    </button>
                                )}
                            </div>
                            {state.currentQuestion && (
                                <span className="absolute right-2 bottom-2">{`Question ${
                                    state.completedList.length + 1
                                } of ${DATA.length}`}</span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
