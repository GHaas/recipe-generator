async function generateRecipe() {
    const generateButton = document.getElementById('generate-button');
    generateButton.disabled = true;

    const ingredients = document.getElementById('ingredients').value;
    const healthiness = document.getElementById('healthiness').value;
    const difficulty = document.getElementById('difficulty').value;
    const preptime = document.getElementById('preptime').value;

    const prompt = `Generate a recipe using the following ingredients: ${ingredients}. 
    The recipe should have a healthiness rating of ${healthiness} out of 10, 
    a difficulty rating of ${difficulty} out of 10, and should take around ${preptime} minutes to prepare.`;

    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const recipe = data.choices[0].text.trim();
        document.getElementById('recipe-output').textContent = recipe;
    } catch (error) {
        document.getElementById('recipe-output').textContent = 'Error generating recipe. Please try again later.';
    }

    setTimeout(() => {
        generateButton.disabled = false;
    }, 20000); // 20 seconds timeout
}
