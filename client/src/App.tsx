import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AtSymbol } from 'heroicons-react';
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
    isCompleted: boolean;
    finalScore: number;
};

const App: FC = () => {
    const [state, setState] = useState<StateT>({
        questionList: [...DATA],
        currentQuestionIndex: null,
        answerScoreHistory: [],
        canProceed: false,
        isChecked: { answer1: false, answer2: false, answer3: false, answer4: false },
        isCompleted: false,
        finalScore: 0,
    });
    const { questionList, currentQuestionIndex, canProceed, isChecked, isCompleted, finalScore } = state;
    useEffect(() => {
        console.log('🚀 ~ file: App.tsx:32 ~ state:', state);
    }, [state]);
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
            case 'finish':
                handleNext(checkedScore);
                setState((prevState) => ({
                    ...prevState,
                    isCompleted: true,
                    finalScore: prevState.answerScoreHistory.reduce((a, b) => a + b),
                }));
                break;
            case 'submit':
                console.log('��� ~ file: App.tsx:100 ~ SUBMIT EMAIL FEATURE ~', finalScore);
                break;
            default:
                break;
        }
    };
    const renderHeadingText = (questionText: string, qIndex: number | null, completed: boolean): string => {
        if (qIndex !== null && qIndex >= 0 && !completed) return questionText;
        else if (completed) return 'Final Results';
        else return 'Start intro prompting';
    };
    return (
        <div className="h-screen w-100">
            <div className="h-full pt-32">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black">Assessment Questioner</h1>
                    <div className="min-h-96 w-2/4 bg-gray-200 mt-12 p-4 pb-8 rounded-lg shadow-xl">
                        <h2 className="text-center text-2xl mb-8 font-semibold">
                            {renderHeadingText(
                                currentQuestionIndex !== null ? questionList[currentQuestionIndex].question : '',
                                currentQuestionIndex,
                                isCompleted,
                            )}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center relative">
                            {currentQuestionIndex !== null &&
                                !isCompleted &&
                                questionList[currentQuestionIndex].response.map((obj: AnswerT, index: number) => {
                                    const checked: boolean = isChecked[('answer' + (index + 1)) as keyof RadioCheckedT];
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
                                })}

                            {isCompleted && (
                                <>
                                    <h2 className="text-xl">Your score is {finalScore}</h2>
                                    <div className="w-1/3 relative">
                                        <AtSymbol
                                            size={20}
                                            className="absolute inset-y-0 left-1 align-middle opacity-40 h-full"
                                        />
                                        <input
                                            type="email"
                                            className="input-default pl-6"
                                            placeholder="Email address"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-around flex-row-reverse w-1/2 mt-3">
                                {currentQuestionIndex !== null && !isCompleted ? (
                                    <>
                                        <button
                                            type="submit"
                                            value={currentQuestionIndex >= questionList.length - 1 ? 'finish' : 'next'}
                                            className={`btn-default${!canProceed ? ' cursor-not-allowed' : ''}`}
                                            disabled={!canProceed}
                                        >
                                            <span className="font-semibold">
                                                {currentQuestionIndex >= questionList.length - 1
                                                    ? 'Complete'
                                                    : 'Next Question'}
                                            </span>
                                            {currentQuestionIndex >= questionList.length - 1 && (
                                                <ChevronRight className="w-5 h-5 inline align-middle" />
                                            )}
                                        </button>
                                        {currentQuestionIndex !== 0 && (
                                            <button type="submit" value="previous" className="btn-default">
                                                <ChevronLeft className="w-5 h-5 inline" />
                                                <span className="align-middle font-semibold">Previous Question</span>
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        value={isCompleted ? 'submit' : 'start'}
                                        className="btn-default font-semibold"
                                    >
                                        {isCompleted ? 'Submit Email' : 'Get Started'}
                                    </button>
                                )}
                            </div>
                            {currentQuestionIndex !== null && !isCompleted && (
                                <span className="absolute right-2 bottom-2">{`Question ${currentQuestionIndex + 1} of ${
                                    questionList.length
                                }`}</span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
