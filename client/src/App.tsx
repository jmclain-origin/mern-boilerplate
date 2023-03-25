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
    questionIndex: number | null;
    answerHistory: Array<number>;
    canProceed: boolean;
    isChecked: RadioCheckedT;
    isCompleted: boolean;
    finalScore: number;
};

const App: FC = () => {
    const [state, setState] = useState<StateT>({
        questionList: [...DATA],
        questionIndex: null,
        answerHistory: [],
        canProceed: false,
        isChecked: { answer1: false, answer2: false, answer3: false, answer4: false },
        isCompleted: false,
        finalScore: 0,
    });
    const { questionList, questionIndex, canProceed, isChecked, isCompleted, finalScore } = state;
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
    const navigateIndex = (index: number | null, arrLength: number): number => {
        if (index !== null) {
            if (index + 1 < arrLength) return index + 1;
            else if (index > 0) return index - 1;
            else return index;
        } else return 0;
    };
    const handleNavigation = (scoreDirection?: number) => {
        setState((prevState) => {
            const copyRadioChecked = { ...prevState.isChecked };
            for (const key in copyRadioChecked) {
                copyRadioChecked[key as keyof RadioCheckedT] = false;
            }
            return {
                ...prevState,
                questionIndex: navigateIndex(prevState.questionIndex, prevState.questionList.length),
                answerHistory: scoreDirection
                    ? prevState.answerHistory.concat(scoreDirection)
                    : prevState.answerHistory.slice(0, -1),
                canProceed: false,
                isChecked: copyRadioChecked,
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
        const formControls: HTMLFormControlsCollection = event.currentTarget.elements;
        let checkedScore = 0;
        for (const E in formControls) {
            const element = formControls[E] as HTMLInputElement;
            if (element.type === 'radio' && element.checked) checkedScore = parseInt(element.value);
        }
        const buttonEvent = event.nativeEvent.submitter as HTMLButtonElement;
        switch (buttonEvent.value) {
            case 'start':
                setState((prevState) => ({ ...prevState, questionIndex: 0 }));
                break;
            case 'next':
                handleNavigation(checkedScore);
                break;
            case 'previous':
                handleNavigation();
                break;
            case 'finish':
                handleNavigation(checkedScore);
                setState((prevState) => ({
                    ...prevState,
                    isCompleted: true,
                    finalScore: prevState.answerHistory.reduce((a, b) => a + b),
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

    const FormInputs =
        questionIndex !== null &&
        !isCompleted &&
        questionList[questionIndex].response.map((obj: AnswerT, index: number) => {
            const checked: boolean = isChecked[('answer' + (index + 1)) as keyof RadioCheckedT];
            return (
                <div key={uuid()} className="w-4/5 bg-white px-8 py-10 mb-2 rounded-2xl shadow-md">
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
        });
    const ResultsDisplay = isCompleted && (
        <>
            <h2 className="text-xl">Your score is {finalScore}</h2>
            <div className="w-1/3 relative">
                <AtSymbol size={20} className="absolute inset-y-0 left-1 align-middle opacity-40 h-full" />
                <input type="email" className="input-default pl-6" placeholder="Email address" />
            </div>
        </>
    );
    const FormControlButtons =
        questionIndex !== null && !isCompleted ? (
            <>
                <button
                    type="submit"
                    value={questionIndex >= questionList.length - 1 ? 'finish' : 'next'}
                    className={`btn-default${!canProceed ? ' cursor-not-allowed' : ''}`}
                    disabled={!canProceed}
                >
                    <span className="font-semibold">
                        {questionIndex >= questionList.length - 1 ? 'Complete' : 'Next Question'}
                    </span>
                    {questionIndex >= questionList.length - 1 && (
                        <ChevronRight className="w-5 h-5 inline align-middle" />
                    )}
                </button>
                {questionIndex !== 0 && (
                    <button type="submit" value="previous" className="btn-default">
                        <ChevronLeft className="w-5 h-5 inline" />
                        <span className="align-middle font-semibold">Previous Question</span>
                    </button>
                )}
            </>
        ) : (
            <button type="submit" value={isCompleted ? 'submit' : 'start'} className="btn-default font-semibold">
                {isCompleted ? 'Submit Email' : 'Get Started'}
            </button>
        );
    return (
        <div className="h-screen w-100">
            <div className="h-full pt-16">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black">Assessment Questioner</h1>
                    <div className="min-h-96 w-2/4 bg-gray-200 mt-12 p-4 pb-8 rounded-lg shadow-xl">
                        <h2 className="text-center text-2xl mb-8 font-semibold">
                            {renderHeadingText(
                                questionIndex !== null ? questionList[questionIndex].question : '',
                                questionIndex,
                                isCompleted,
                            )}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center relative">
                            {FormInputs}
                            {ResultsDisplay}

                            <div className="flex justify-around flex-row-reverse w-1/2 mt-3">{FormControlButtons}</div>
                            {questionIndex !== null && !isCompleted && (
                                <span className="absolute right-2 bottom-2">{`Question ${questionIndex + 1} of ${
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
