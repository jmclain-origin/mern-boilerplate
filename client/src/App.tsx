import { FC } from 'react';
import './app.styles.css';

const App: FC = () => (
    <div className="h-screen w-100">
        <div className="h-full pt-32">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
                <div className="min-h-96 w-3/4 bg-slate-200 mt-12 p-4 pb-8">
                    <h2 className="text-center text-2xl mb-8">Question</h2>
                    <form className="flex flex-col justify-center items-center">
                        <div className="w-4/5 bg-white px-8 py-10 mb-2">
                            <input type="radio" name="question" id="question" />
                            <label htmlFor="answer">answer</label>
                        </div>
                        <div className="w-4/5 bg-white px-8 py-10 mb-2">
                            <input type="radio" name="question" id="question" />
                            <label htmlFor="answer">answer</label>
                        </div>
                        <div className="w-4/5 bg-white px-8 py-10 mb-2">
                            <input type="radio" name="question" id="question" />
                            <label htmlFor="answer">answer</label>
                        </div>
                        <div className="w-4/5 bg-white px-8 py-10 mb-2">
                            <input type="radio" name="question" id="question" />
                            <label htmlFor="answer">answer</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

export default App;
