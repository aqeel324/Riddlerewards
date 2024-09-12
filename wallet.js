window.onload = function() {
    const earningsAmountElement = document.getElementById('earningsAmount');
    const withdrawButton = document.getElementById('withdrawButton');
    const withdrawOptions = document.getElementById('withdrawOptions');
    const MIN_WITHDRAW_AMOUNT = 10000; // Minimum amount for withdrawal

    // Retrieve wallet amount from localStorage
    let walletAmount = parseFloat(localStorage.getItem('totalEarnings')) || 0;
    earningsAmountElement.innerText = walletAmount.toFixed(2);

    function showWithdrawOptions() {
        withdrawOptions.style.display = 'block';
    }

    function withdraw(method) {
        if (walletAmount >= MIN_WITHDRAW_AMOUNT) {
            alert(`You have withdrawn Rs. ${walletAmount.toFixed(2)} via ${method}`);
            localStorage.setItem('totalEarnings', 0); // Reset wallet amount
            earningsAmountElement.innerText = '0.00'; // Update UI
            walletAmount = 0; // Reset local variable
            withdrawOptions.style.display = 'none'; // Hide options after withdrawal
        } else {
            alert(`You need to have at least Rs. ${MIN_WITHDRAW_AMOUNT} to withdraw. Your current balance is Rs. ${walletAmount.toFixed(2)}`);
        }
    }

    withdrawButton.addEventListener('click', showWithdrawOptions);
    window.withdraw = withdraw; // Make withdraw function available globally
};