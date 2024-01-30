// Adicione estas funções ao seu script.js

function showSteps(activityTitle, steps) {
    const stepsContainer = document.querySelector('.steps-container');
    const activityList = document.querySelector('.activity-list');

    // Exibir os passos da atividade selecionada na parte inferior
   stepsContainer.innerHTML = `<h2 id="activity-title">${activityTitle}</h2>
                                <ul id="step-list">
                                    ${steps.map((step, index) => `<li><input type="checkbox" id="step-${index + 1}" ${getCompletionStatus(activityTitle, index + 1)} onchange="toggleCompletion('${activityTitle}', ${index + 1})"> <label for="step-${index + 1}">${step}</label></li>`).join('')}
                                </ul>`;


    // Verificar se todos os passos estão marcados
    if (areAllStepsCompleted(activityTitle)) {
	
        markActivityCompleted(activityTitle);
    } else {
        unmarkActivityCompleted();
    }

    // Mostrar os passos na parte superior
    stepsContainer.classList.add('active');
    activityList.classList.remove('active');
}

function toggleCompletion(activityTitle, stepIndex) {
    const checkbox = document.getElementById(`step-${stepIndex}`);
    const label = document.querySelector(`label[for="step-${stepIndex}"]`);

    if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
    } else {
        label.style.textDecoration = 'none';
    }

    // Salvar o estado no localStorage
    localStorage.setItem(`${activityTitle}-${stepIndex}`, checkbox.checked);

    // Verificar se todos os passos estão marcados
    if (areAllStepsCompleted(activityTitle)) {
	console.log('as 3 estao marcadas!');
        markActivityCompleted(activityTitle);
    } else {
        unmarkActivityCompleted(activityTitle);
    }
}

function getCompletionStatus(activityTitle, stepIndex) {
    // Obter o estado do localStorage
    const completionStatus = localStorage.getItem(`${activityTitle}-${stepIndex}`);

    // Retornar a string correspondente ao estado salvo
    return completionStatus === 'true' ? 'checked' : '';
}

function areAllStepsCompleted(activityTitle) {
    // Verificar se todos os passos estão marcados
    const steps = document.querySelectorAll(`input[type="checkbox"][id^="${activityTitle}-"]`);
    return Array.from(steps).every(step => step.checked);
}

function markActivityCompleted(activityTitle) {
   // Adicionar estilo especial à atividade específica na parte inferior do wrapper
   const completedActivity = document.querySelector(`.activity-list .activity[data-title="${activityTitle}"]`);
    console.log(completedActivity);
   if (completedActivity) {
       completedActivity.style.textDecoration = 'line-through';
       completedActivity.style.backgroundColor = '#f5f5f5'; // Cor de fundo alterada
       completedActivity.style.filter = 'blur(2px)'; // Pequeno desfoque
   }
}

function unmarkActivityCompleted() {
    // Remover estilo especial da atividade na parte inferior do wrapper
    const activityList = document.querySelector('.activity-list');
    activityList.style.textDecoration = 'none';
    activityList.style.backgroundColor = 'inherit';
    activityList.style.filter = 'none';
}
