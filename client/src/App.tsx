import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'heroicons-react';
import { v4 as uuid } from 'uuid';
import { mockData as DATA } from './assets/mockData';

type QuestionT = typeof DATA[0];
type AnswerT = { answer: string; score: number };
type RadioCheckedT = {
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
};
type StateT = {
    questionList: QuestionT[];
    currentQuestionIndex: number | null;
    answerScoreHistory: Array<number>;
    canProceed: boolean;
    isChecked: RadioCheckedT;
};

const App: FC = () => {
    const [state, setState] = useState<StateT>({
        questionList: [...DATA],
        currentQuestionIndex: null,
        answerScoreHistory: [],
        canProceed: false,
        isChecked: { answer1: false, answer2: false, answer3: false, answer4: false },
    });
    useEffect(() => {
        setState((prevState) => {
            const shuffledList: QuestionT[] = [];
            const copyStateData = [...prevState.questionList];
            while (shuffledList.length < DATA.length) {
                const randomIndex = Math.floor(Math.random() * DATA.length);
                if (!shuffledList.find(({ id }) => copyStateData[randomIndex].id === id)) {
                    shuffledList.push(copyStateData[randomIndex]);
                }
            }
            return {
                ...prevState,
                questionList: shuffledList,
            };
        });
    }, []);
    const handleNext = (score: number) => {
        setState((prevState) => {
            const copyRadioState = { ...prevState.isChecked };
            for (const key in copyRadioState) {
                copyRadioState[key as keyof RadioCheckedT] = false;
            }

            return {
                ...prevState,
                currentQuestionIndex:
                    prevState.currentQuestionIndex !== null &&
                    prevState.currentQuestionIndex + 1 < prevState.questionList.length
                        ? prevState.currentQuestionIndex + 1
                        : prevState.currentQuestionIndex,
                answerScoreHistory: prevState.answerScoreHistory.concat(score),
                canProceed: false,
                isChecked: copyRadioState,
            };
        });
    };
    const handlePrevious = () => {
        setState((prevState) => {
            const copyRadioState = { ...prevState.isChecked };
            for (const key in copyRadioState) {
                copyRadioState[key as keyof RadioCheckedT] = false;
            }
            return {
                ...prevState,
                currentQuestionIndex:
                    prevState.currentQuestionIndex !== null && prevState.currentQuestionIndex > 0
                        ? prevState.currentQuestionIndex - 1
                        : prevState.currentQuestionIndex,
                answerScoreHistory: prevState.answerScoreHistory.slice(0, -1),
                canProceed: false,
                isChecked: copyRadioState,
            };
        });
    };
    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const targetEle = event.target as HTMLInputElement;
        const radioKey = targetEle.id;
        setState((prevState) => {
            const copyState = { ...prevState };
            const checkKeyCopy = { ...copyState.isChecked };
            for (const key in checkKeyCopy) {
                checkKeyCopy[key as keyof RadioCheckedT] = false;
            }
            copyState.isChecked = checkKeyCopy;
            copyState.isChecked[radioKey as keyof RadioCheckedT] = targetEle.checked;
            return { ...copyState, canProceed: true };
        });
    };
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();
        const formControl = event.target as HTMLFormElement;
        const controlEleCol = formControl.elements;
        let checkedScore = 0;
        for (const ele in controlEleCol) {
            const controlEle = controlEleCol[ele] as HTMLInputElement;
            if (controlEle.type === 'radio' && controlEle.checked) checkedScore = parseInt(controlEle.value);
        }
        const buttonClicked = event.nativeEvent.submitter as HTMLButtonElement;
        switch (buttonClicked.value) {
            case 'start':
                setState((prevState) => ({ ...prevState, currentQuestionIndex: 0 }));
                break;
            case 'next':
                handleNext(checkedScore);
                break;
            case 'previous':
                handlePrevious();
                break;
            default:
                break;
        }
    };
    return (
        <div className="h-screen w-100">
            <div className="h-full pt-32">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black">Questioner</h1>
                    <div className="min-h-96 w-2/4 bg-gray-200 mt-12 p-4 pb-8 rounded-lg shadow-xl">
                        <h2 className="text-center text-2xl mb-8 font-semibold">
                            {state.currentQuestionIndex
                                ? state.questionList[state.currentQuestionIndex].question
                                : 'Start intro prompting'}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center relative">
                            {state.currentQuestionIndex !== null &&
                                state.questionList[state.currentQuestionIndex].response.map(
                                    (obj: AnswerT, index: number) => {
                                        const checked: boolean =
                                            state.isChecked[('answer' + (index + 1)) as keyof RadioCheckedT];
                                        return (
                                            <div
                                                key={uuid()}
                                                className="w-4/5 bg-white px-8 py-10 mb-2 rounded-2xl shadow-md"
                                            >
                                                <input
                                                    type="radio"
                                                    id={`answer${index + 1}`}
                                                    className="accent-slate-600 w-5 h-5 align-middle"
                                                    name="answer"
                                                    value={obj.score}
                                                    checked={checked}
                                                    onChange={handleChange}
                                                />
                                                <label className="px-2" htmlFor={`answer${index + 1}`}>
                                                    {`${obj.score}---${obj.answer}`}
                                                </label>
                                            </div>
                                        );
                                    },
                                )}

                            <div className="flex justify-around flex-row-reverse w-1/2 mt-3">
                                {state.currentQuestionIndex !== null ? (
                                    <>
                                        <button
                                            type="submit"
                                            value="next"
                                            className={`btn-default${!state.canProceed ? ' cursor-not-allowed' : ''}`}
                                            disabled={!state.canProceed}
                                        >
                                            <span className="font-semibold">Next Question</span>
                                            <ChevronRight className="w-5 h-5 inline align-middle" />
                                        </button>
                                        {state.currentQuestionIndex !== 0 && (
                                            <button type="submit" value="previous" className="btn-default">
                                                <ChevronLeft className="w-5 h-5 inline" />
                                                <span className="align-middle font-semibold">Previous Question</span>
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button type="submit" value="start" className="btn-default font-semibold">
                                        Get Started
                                    </button>
                                )}
                            </div>
                            {state.currentQuestionIndex !== null && (
                                <span className="absolute right-2 bottom-2">{`Question ${
                                    state.currentQuestionIndex + 1
                                } of ${state.questionList.length}`}</span>
                            )}
                            {state.answerScoreHistory.length > 0 && (
                                <span className="absolute left-2 bottom-2">
                                    {state.answerScoreHistory.reduce((a, b) => a + b)}
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
