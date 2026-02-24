import React from "react";

const SecurityModal = ({title, security, notes, onClose}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-900/75" onClick={onClose}></div>
            <div className="relative transform overflow-hidden rounded-lg bg-bs-primary-500 text-left shadow-xl outline -outline-offset-1 outline-white/10 sm:my-8 sm:w-full sm:max-w-lg z-10">
                <div className="bg-bs-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-3xl font-semibold text-white">
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-m text-white-800">
                                    {security}
                                </p>
                                <br></br>
                                <div className={notes ? "mt-1" : "hidden"}>
                                    <p className="text-xs text-gray-400">
                                        Notes: {notes}
                                    </p>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        onClick={onClose}
                        className="inline-flex w-full justify-center rounded-md bg-bs-secondary px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-bs-secondary-700 sm:w-auto">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SecurityModal;