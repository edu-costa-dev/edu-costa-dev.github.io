document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS para animações de scroll
    AOS.init({
        duration: 800,
        once: false,
        offset: 50
    });


    // Random Cover Photo Logic
    const coverPhoto = document.getElementById('cover-photo');
    if (coverPhoto) {
        const coverImages = [
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&h=400&auto=format&fit=crop'
        ];
        const randomImg = coverImages[Math.floor(Math.random() * coverImages.length)];
        coverPhoto.style.backgroundImage = `url('${randomImg}')`;
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });

    // Populate Data
    if (typeof portfolioData !== 'undefined') {
        populateProfile(portfolioData.persona);
        populateBusiness(portfolioData.business);
        populateAcademicAndCerts(portfolioData.academic, portfolioData.certifications);
        populateSidebarSkills(portfolioData.academic, portfolioData.certifications);


    }
    
    // Project Modal Logic
    const btnPetshop = document.getElementById('btn-petshop');
    const projectModal = document.getElementById('project-modal');
    const projectModalBackdrop = document.getElementById('project-modal-backdrop');
    const projectModalContent = document.getElementById('project-modal-content');
    const closeProjectModalBtn = document.getElementById('close-project-modal');

    if (btnPetshop && projectModal) {
        function openProjectModal() {
            projectModal.classList.remove('hidden');
            setTimeout(() => {
                projectModalBackdrop.classList.remove('opacity-0');
                projectModalContent.classList.remove('opacity-0', 'scale-95');
                projectModalContent.classList.add('opacity-100', 'scale-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            projectModalBackdrop.classList.add('opacity-0');
            projectModalContent.classList.remove('opacity-100', 'scale-100');
            projectModalContent.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                projectModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        btnPetshop.addEventListener('click', openProjectModal);
        closeProjectModalBtn.addEventListener('click', closeProjectModal);
        projectModalBackdrop.addEventListener('click', closeProjectModal);
    }
});

function populateProfile(persona) {
    if(!persona) return;
    
    document.getElementById('profile-name').textContent = persona.nome_completo || 'Edu';
    document.getElementById('profile-role').textContent = persona.grau_escolaridade || 'Desenvolvedor';
    
    let bio = "";
    if(persona.hobbies) bio += "🎮 Hobbies: " + persona.hobbies.join(' • ') + "\n\n";
    if(persona.livros_preferidos) bio += "📚 Livros: " + persona.livros_preferidos.join(' • ');
    document.getElementById('profile-bio').innerText = bio;

    // Socials
    const socialsContainer = document.getElementById('profile-socials');
    socialsContainer.innerHTML = '';
    
    const links = [];
    if(persona.profissional_dev?.linkedin) links.push({icon: 'fab fa-linkedin', url: persona.profissional_dev.linkedin, color: 'hover:text-blue-500'});
    if(persona.profissional_dev?.github) links.push({icon: 'fab fa-github', url: persona.profissional_dev.github, color: 'hover:text-gray-800 dark:hover:text-white'});
    if(persona.contato?.email) links.push({icon: 'fas fa-envelope', url: 'mailto:'+persona.contato.email, color: 'hover:text-red-500'});
    if(persona.redes_sociais?.instagram) links.push({icon: 'fab fa-instagram', url: persona.redes_sociais.instagram, color: 'hover:text-pink-500'});

    const navSocialsContainer = document.getElementById('nav-socials');
    if (navSocialsContainer) navSocialsContainer.innerHTML = '';
    
    links.forEach(link => {
        // Socials no Profile Card
        const aCard = document.createElement('a');
        aCard.href = link.url;
        aCard.target = '_blank';
        aCard.className = `flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all ${link.color.replace('hover:text-', 'hover:bg-').replace('500', '100')} dark:${link.color.replace('hover:text-', 'hover:bg-').replace('500', '900/30')} transform hover:scale-110`;
        aCard.innerHTML = `<i class="${link.icon} text-lg"></i>`;
        socialsContainer.appendChild(aCard);
        
        // Socials no Menu de Navegação Superior
        if (navSocialsContainer) {
            const aNav = document.createElement('a');
            aNav.href = link.url;
            aNav.target = '_blank';
            aNav.className = `text-gray-400 transition-colors text-xl hover:text-brand dark:text-brand-neon transform hover:scale-110`;
            aNav.innerHTML = `<i class="${link.icon}"></i>`;
            navSocialsContainer.appendChild(aNav);
        }
    });

    // Goals
    const goalsContainer = document.getElementById('profile-goals');
    goalsContainer.innerHTML = '';
    if(persona.projetos_vida) {
        persona.projetos_vida.forEach(goal => {
            const li = document.createElement('li');
            li.className = "flex items-start gap-3 text-gray-700 dark:text-gray-300";
            li.innerHTML = `<i class="fas fa-check-circle text-brand dark:text-brand-neon mt-1"></i> <span>${goal}</span>`;
            goalsContainer.appendChild(li);
        });


    }
}

function getSkillsFromData() {
    const skills = new Set();
    if (portfolioData.business) {
        portfolioData.business.forEach(b => {
            if(b["Tecnologias utilizadas"]) b["Tecnologias utilizadas"].forEach(s => skills.add(s));
            if(b["Ferramentas"]) b["Ferramentas"].forEach(s => skills.add(s));
        });
    }
    if (portfolioData.academic) {
        portfolioData.academic.forEach(a => {
            if(a.habilidades_principais) a.habilidades_principais.forEach(s => skills.add(s));
        });
    }
    return Array.from(skills).slice(0, 12);
}

function renderSkillsList(skillsArray) {
    if(!skillsArray || skillsArray.length === 0) return '';
    return skillsArray.map(s => 
        `<span class="skill-tag text-xs px-3 py-1.5 rounded-md border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default shadow-sm"><i class="fas fa-hashtag text-brand-light mr-1 opacity-50"></i>${s}</span>`
    ).join('');
}

function populateBusiness(business) {
    const container = document.getElementById('business-feed');
    if (!container || !business) return;
    container.innerHTML = '';
    
    business.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'relative pl-8 pb-8';
        
        if (index !== business.length - 1) {
            const line = document.createElement('div');
            line.className = 'timeline-line';
            div.appendChild(line);
        }

        const icon = document.createElement('div');
        icon.className = 'absolute left-0 top-1.5 w-7 h-7 rounded-full bg-brand dark:bg-brand-neon flex items-center justify-center text-white text-xs z-10 shadow-lg shadow-brand-neon/40';
        icon.innerHTML = '<i class="fas fa-briefcase"></i>';
        div.appendChild(icon);

        const tags = [
            ...(item["Tecnologias utilizadas"] || []),
            ...(item["Ferramentas"] || []),
            ...(item["Outras informações e/ou tags"] || [])
        ];

        div.innerHTML += `
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-6 hover-card ml-2">
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">${item["Cargo/Função"]}</h3>
                <p class="text-brand dark:text-brand-neon text-sm font-semibold mb-3">${item["Empresa"]}</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">${item["Descrição das Atividades"] || ''}</p>
                
                <div class="flex flex-wrap gap-2">
                    ${renderSkillsList(tags)}
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    const sidebarSkills = document.getElementById('profile-skills');
    if (sidebarSkills) {
        sidebarSkills.innerHTML = renderSkillsList(getSkillsFromData());


    }
}

function populateAcademicAndCerts(academic, certs) {
    const acadContainer = document.getElementById('academic-feed');
    const ongoingContainer = document.getElementById('ongoing-feed');
    const ongoingSection = document.getElementById('ongoing-section');
    const certsContainer = document.getElementById('google-certs-feed');
    const certsSection = document.getElementById('google-cert-section');

    if(acadContainer) acadContainer.innerHTML = '';
    if(ongoingContainer) ongoingContainer.innerHTML = '';
    if(certsContainer) certsContainer.innerHTML = '';

    // Filtra Cursos em andamento (Backend Node.js)
    const ongoingCourses = academic.filter(item => 
        (item.progresso && Object.values(item.progresso).some(m => m.status.toLowerCase().includes('aguardando') || m.status.toLowerCase().includes('andamento'))) || 
        (item.status && item.status.toLowerCase().includes('andamento')) ||
        (item.area_foco && item.area_foco.includes('Backend')) ||
        (item.curso && item.curso.includes('Node.js'))
    );

    const completedCourses = academic.filter(item => !ongoingCourses.includes(item));

    // Logic for Task Year filtering
    const taskYearSelector = document.getElementById('task-year-selector');
    
    function renderTasksForYear(year) {
        if (!ongoingContainer) return;
        ongoingContainer.innerHTML = '';
        let hasTasks = false;

        if (year === '2026') {
            // Render Ongoing Courses (2026)
            if (ongoingCourses.length > 0) {
                hasTasks = true;
                ongoingCourses.forEach(item => {
                    let inst = item.instituicao || item.Instituição;
                    if (inst.includes('SC Tec') && inst.includes('Módulo 2')) inst = inst.replace('Módulo 2', 'Módulo 1');
                    
                    ongoingContainer.innerHTML += `
                        <div class="flex flex-col gap-2 p-3 bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-2xl shadow-sm border border-green-200 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all relative overflow-hidden">
                            <div class="absolute right-0 top-0 w-16 h-16 bg-green-500/5 dark:bg-green-400/5 rounded-bl-full -mr-2 -mt-2"></div>
                            <div class="flex items-center gap-3 relative z-10">
                                <div class="w-5 h-5 rounded-full border-2 border-green-500/60 flex-shrink-0 relative overflow-hidden group cursor-pointer bg-white dark:bg-dark-card">
                                    <div class="absolute inset-0 bg-green-500 scale-0 group-hover:scale-50 rounded-full transition-transform duration-300"></div>
                                </div>
                                <div class="flex-grow min-w-0">
                                    <h3 class="font-bold text-sm text-green-700 dark:text-green-400 truncate">${item.curso || item.nome}</h3>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${inst}</p>
                                </div>
                                <i class="fas fa-laptop-code text-green-500 dark:text-green-400 text-lg opacity-80"></i>
                            </div>
                        </div>
                    `;
                });
            }

            // Render Ongoing Certifications (Google IT Support)
            if (certs) {
                certs.forEach(cert => {
                    if (cert.certificacao_macro && cert.certificacao_macro.status_geral && cert.certificacao_macro.status_geral.toLowerCase().includes('andamento')) {
                        hasTasks = true;
                        let subtaskId = `subtasks-${Math.random().toString(36).substr(2, 9)}`;
                        let subtasksHTML = '';
                        if (cert.grade_curricular) {
                            subtasksHTML = `
                                <div class="mt-2 ml-8">
                                    <button onclick="
                                const content = document.getElementById('${subtaskId}');
                                content.classList.toggle('max-h-0');
                                content.classList.toggle('opacity-0');
                                content.classList.toggle('max-h-[1000px]');
                                content.classList.toggle('opacity-100');
                                content.classList.toggle('mt-3');
                                this.querySelector('i').classList.toggle('rotate-180');
                            " class="text-[10px] text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-brand-neon font-semibold cursor-pointer mb-1 focus:outline-none flex items-center gap-1 transition-colors">
                                        Ver/Ocultar Módulos <i class="fas fa-chevron-down text-[9px] transition-transform duration-300"></i>
                                    </button>
                                    <div id="${subtaskId}" class="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                                        <div class="flex flex-col gap-3 pb-1">
                            `;
                            cert.grade_curricular.forEach(sub => {
                                let progressVal = sub.progresso_individual || '0%';
                                subtasksHTML += `
                                    <div class="flex flex-col gap-1.5">
                                        <div class="flex justify-between items-center text-[10px] sm:text-xs">
                                            <span class="text-gray-600 dark:text-gray-300 font-medium truncate pr-2">${sub.nome_curso}</span>
                                            <span class="text-brand dark:text-brand-neon font-bold">${progressVal}</span>
                                        </div>
                                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                            <div class="bg-brand dark:bg-brand-neon h-1.5 rounded-full transition-all duration-1000" style="width: ${progressVal}"></div>
                                        </div>
                                    </div>
                                `;
                            });
                            subtasksHTML += '</div></div></div>';
                        }

                        ongoingContainer.innerHTML += `
                            <div class="flex flex-col p-3 bg-gradient-to-r from-brand-light/10 to-transparent dark:from-brand-neon/10 dark:to-transparent rounded-2xl shadow-sm border border-brand/20 dark:border-brand-neon/20 hover:border-brand/50 dark:hover:border-brand-neon/50 hover:shadow-md transition-all relative overflow-hidden">
                                <div class="absolute right-0 top-0 w-16 h-16 bg-brand/5 dark:bg-brand-neon/5 rounded-bl-full -mr-2 -mt-2"></div>
                                <div class="flex items-center gap-3 mb-1 relative z-10">
                                    <div class="w-5 h-5 rounded-full border-2 border-brand/50 dark:border-brand-neon/50 flex-shrink-0 relative overflow-hidden group cursor-pointer bg-white dark:bg-dark-card">
                                        <div class="absolute inset-0 bg-brand dark:bg-brand-neon scale-0 group-hover:scale-50 rounded-full transition-transform duration-300"></div>
                                    </div>
                                    <div class="flex-grow min-w-0">
                                        <h3 class="font-bold text-sm text-brand dark:text-brand-neon truncate">Certificação ${cert.certificacao_macro.titulo}</h3>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${cert.certificacao_macro.instituicao}</p>
                                    </div>
                                    <i class="fab fa-google text-brand dark:text-brand-neon text-lg opacity-80"></i>
                                </div>
                                <div class="relative z-10">
                                    ${subtasksHTML}
                                </div>
                            </div>
                        `;
                    }
                });
            }
        } else if (year === '2027') {
            // Render Ongoing Courses (2027) - Only SC Tec but as Module 2
            ongoingCourses.forEach(item => {
                let inst = item.instituicao || item.Instituição;
                if (inst.includes('SC Tec')) {
                    hasTasks = true;
                    if (inst.includes('Módulo 1')) {
                        inst = inst.replace('Módulo 1', 'Módulo 2');
                    } else if (!inst.includes('Módulo 2')) {
                        inst += ' - Módulo 2';
                    }
                    
                    ongoingContainer.innerHTML += `
                        <div class="flex flex-col gap-2 p-3 bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-2xl shadow-sm border border-green-200 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all relative overflow-hidden">
                            <div class="absolute right-0 top-0 w-16 h-16 bg-green-500/5 dark:bg-green-400/5 rounded-bl-full -mr-2 -mt-2"></div>
                            <div class="flex items-center gap-3 relative z-10">
                                <div class="w-5 h-5 rounded-full border-2 border-green-500/60 flex-shrink-0 relative overflow-hidden group cursor-pointer bg-white dark:bg-dark-card">
                                    <div class="absolute inset-0 bg-green-500 scale-0 group-hover:scale-50 rounded-full transition-transform duration-300"></div>
                                </div>
                                <div class="flex-grow min-w-0">
                                    <h3 class="font-bold text-sm text-green-700 dark:text-green-400 truncate">${item.curso || item.nome}</h3>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${inst}</p>
                                </div>
                                <i class="fas fa-laptop-code text-green-500 dark:text-green-400 text-lg opacity-80"></i>
                            </div>
                        </div>
                    `;
                }
            });

            // Golden Task for 2027
            hasTasks = true;
            ongoingContainer.innerHTML += `
                <div class="flex flex-col gap-2 p-3 bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 dark:from-yellow-900/40 dark:via-yellow-800/30 dark:to-yellow-900/40 rounded-2xl shadow-sm border border-yellow-400/50 dark:border-yellow-500/50 hover:shadow-md hover:border-yellow-500 transition-all relative group">
                    <div class="flex items-center gap-3 relative z-10">
                        <div class="w-5 h-5 rounded-full border-2 border-yellow-500/60 flex-shrink-0 relative overflow-hidden bg-white/50 dark:bg-dark-card cursor-pointer">
                            <div class="absolute inset-0 bg-yellow-500 scale-0 group-hover:scale-50 rounded-full transition-transform duration-300"></div>
                        </div>
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-sm text-yellow-900 dark:text-yellow-300 truncate drop-shadow-sm">Ingressar como Desenvolvedor Backend Junior</h3>
                            <p class="text-xs text-yellow-700 dark:text-yellow-500/90 truncate font-medium">Meta Profissional</p>
                        </div>
                        <i class="fas fa-trophy text-yellow-500 dark:text-yellow-400 text-lg animate-pulse drop-shadow-md"></i>
                    </div>
                </div>
            `;
        }

        if (hasTasks || document.getElementById('projects-grid').children.length > 0) {
            ongoingSection.classList.remove('hidden');
        }
    }

    if (taskYearSelector) {
        // Inicializa classes de transição no container
        ongoingContainer.classList.add('transition-all', 'duration-500', 'ease-in-out', 'overflow-hidden', 'transform');
        
        taskYearSelector.addEventListener('change', (e) => {
            // Encolhe e esconde
            ongoingContainer.style.maxHeight = '0px';
            ongoingContainer.classList.add('opacity-0', 'scale-95');
            
            setTimeout(() => {
                // Renderiza o novo ano
                renderTasksForYear(e.target.value);
                // Aguarda um pequeno ciclo para o DOM atualizar antes de expandir
                requestAnimationFrame(() => {
                    ongoingContainer.style.maxHeight = '2000px';
                    ongoingContainer.classList.remove('opacity-0', 'scale-95');
                });
            }, 500); // Aguarda o fim da animação de saída
        });
        
        // Render initial view
        renderTasksForYear(taskYearSelector.value);
        ongoingContainer.style.maxHeight = '2000px';
    }

    // Render Completed Courses
    completedCourses.forEach(item => {
        
        let tags = item.habilidades_principais || item.topicos_principais || item.competencias || [];
        if (tags.length === 0 && item["Conteudo Ministrado"]) {
            // Generate tags based on some keywords in the content
            const contentStr = item["Conteudo Ministrado"].join(' ').toLowerCase();
            const possibleTags = ["IA", "Prompt", "Front-End", "Back-End", "Node.js", "HTML", "CSS", "JavaScript", "Ética", "LGPD"];
            tags = possibleTags.filter(t => contentStr.includes(t.toLowerCase()));
            if(tags.length === 0) tags = ["Tecnologia"];
        }

        const title = item.curso || item.Curso || item.nome || 'Curso';
        const inst = item.instituicao || item.Instituição || 'Instituição';
        const ch = item.carga_horaria_total || item.Duração || '';

        let themeClasses = "bg-white dark:bg-dark-card border-gray-100 dark:border-dark-border";
        let iconHtml = '<i class="fas fa-check-circle text-green-500 opacity-80 mt-1"></i>';
        let headerClasses = "text-gray-900 dark:text-white";

        if (item.tema === 'unilasalle') {
            themeClasses = "bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-dark-card border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-300 transition-all";
            iconHtml = '<div class="flex items-center bg-indigo-900 text-white font-serif font-bold px-2 py-0.5 rounded text-[10px] shadow-sm"><i class="fas fa-star text-[8px] text-yellow-400 mr-1"></i> La Salle</div>';
            headerClasses = "text-indigo-900 dark:text-indigo-300";
        } else if (item.tema === 'senai') {
            themeClasses = "bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-dark-card border-green-200 dark:border-green-800/50 hover:border-green-400 transition-all";
            iconHtml = '<div class="flex items-center bg-green-600 text-white font-black italic tracking-tighter px-2 py-0.5 rounded text-[10px] shadow-sm gap-1"><span>SESI</span><span>SENAI</span></div>';
            headerClasses = "text-green-900 dark:text-green-400";
        }

        let subCoursesHtml = '';
        if (item.sub_cursos && item.sub_cursos.length > 0) {
            const btnId = 'btn-sub-' + Math.random().toString(36).substr(2, 9);
            const contentId = 'content-' + btnId;
            let listHtml = item.sub_cursos.map(sc => `
                <li class="flex items-start gap-2 py-1.5 border-b border-gray-100 dark:border-dark-border last:border-0">
                    <i class="fas fa-check-circle text-green-500 mt-0.5 text-xs"></i>
                    <div class="flex-1">
                        <span class="text-sm text-gray-800 dark:text-gray-200 font-medium leading-tight block">${sc.nome}</span>
                        ${sc.duracao ? `<span class="text-xs text-gray-500 dark:text-gray-400"><i class="far fa-clock mr-1"></i>${sc.duracao}</span>` : ''}
                    </div>
                </li>
            `).join('');
            
            subCoursesHtml = `
                <div class="mt-4 border-t border-gray-200 dark:border-white/10 pt-3">
                    <button class="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none" onclick="
                        const c = document.getElementById('${contentId}');
                        const i = this.querySelector('.toggle-icon');
                        if(c.classList.contains('max-h-0')) {
                            c.classList.remove('max-h-0', 'opacity-0');
                            c.classList.add('max-h-[500px]', 'opacity-100', 'mt-3');
                            i.classList.remove('fa-chevron-down');
                            i.classList.add('fa-chevron-up');
                        } else {
                            c.classList.add('max-h-0', 'opacity-0');
                            c.classList.remove('max-h-[500px]', 'opacity-100', 'mt-3');
                            i.classList.remove('fa-chevron-up');
                            i.classList.add('fa-chevron-down');
                        }
                    ">
                        <span><i class="fas fa-list-ul mr-2 opacity-70"></i>Módulos Concluídos</span>
                        <i class="fas fa-chevron-down toggle-icon transition-transform duration-300"></i>
                    </button>
                    <div id="${contentId}" class="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                        <ul class="flex flex-col pl-1">
                            ${listHtml}
                        </ul>
                    </div>
                </div>
            `;
        }

        acadContainer.innerHTML += `
            <div class="rounded-2xl shadow-sm border p-6 hover-card flex flex-col justify-between break-inside-avoid inline-block w-full ${themeClasses}">
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="font-bold text-md leading-tight pr-4 ${headerClasses}">${title}</h3>
                        ${iconHtml}
                    </div>
                    <p class="text-gray-500 dark:text-gray-400 text-xs mb-4 font-medium flex items-center gap-1">
                        <i class="fas fa-university"></i> ${inst} ${ch ? '• <i class="far fa-clock ml-1"></i> ' + ch : ''}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        ${renderSkillsList(tags)}
                    </div>
                    ${subCoursesHtml}
                </div>
            </div>
        `;
    });

    // Render Google Certs
    if (certs && certs.length > 0) {
        certsSection.style.display = 'block';
        certs.forEach(cert => {
            const info = cert.certificacao || cert.certificacao_macro || {};
            const title = info.titulo_curso || info.titulo || 'Certificação';
            const verifyUrl = info.url_verificacao || (cert.medalhas_credly && cert.medalhas_credly[0] ? cert.medalhas_credly[0].url_badge : '#');
            
            let badgesHTML = '';
            if (cert.medalhas_credly) {
                cert.medalhas_credly.forEach(b => {
                    const badgeUrl = b.url_badge || verifyUrl;
                    const imgPath = info.emblema_local ? info.emblema_local.replace('./information_user/', 'user_information/academic/certification/') : '';
                    badgesHTML += `<a href="${badgeUrl}" target="_blank" class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 badge-hover flex-shrink-0" title="${b.nome_emblema}">
                                      <img src="${imgPath}" onerror="this.outerHTML='<i class=\'fas fa-award text-3xl text-yellow-500\'></i>'" alt="Badge" class="w-full h-full object-contain rounded-full p-1">
                                   </a>`;
                });
            } else {
                badgesHTML += `<div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600 flex-shrink-0" title="Emblema em breve">
                                  <i class="fas fa-lock text-xl text-gray-400 dark:text-gray-500"></i>
                               </div>`;
            }

            let isGoogleAI = title.toLowerCase().includes('google ai');

            if (isGoogleAI) {
                certsContainer.innerHTML += `
                    <div class="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-dark-border hover-card transition-all text-center items-center">
                        <div class="flex justify-center w-full -mb-2 mt-2">
                            <div class="bg-white rounded-xl p-2 shadow-sm w-[166px] h-[166px] flex justify-center items-center relative">
                                <!-- O script do Credly vai renderizar o iframe aqui dentro -->
                                <div data-iframe-width="150" data-iframe-height="150" data-share-badge-id="b65644d0-31bd-4ace-a357-b687381c6052" data-share-badge-host="https://www.credly.com" class="relative z-10 w-full h-full flex justify-center items-center"></div>
                                
                                <!-- Fallback/Logo nativa caso o script bloqueie (ex: adblock) -->
                                <img src="user_information/academic/certification/badge/google-ai-professional-certificate.png" class="w-32 h-32 absolute inset-0 m-auto object-contain pointer-events-none" alt="Google AI Logo" onerror="this.style.display='none'">
                            </div>
                        </div>
                        
                        <h3 class="font-bold text-sm text-gray-900 dark:text-white leading-tight flex items-center justify-center gap-2">${title}</h3>
                        
                        <div class="flex flex-col gap-2 w-full mt-2">
                            <a href="https://www.credly.com/earner/earned/badge/b65644d0-31bd-4ace-a357-b687381c6052" target="_blank" class="w-full bg-brand dark:bg-brand-neon text-white dark:text-gray-900 text-xs py-2 rounded-lg font-semibold hover:bg-brand dark:bg-brand-neon/90 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <i class="fas fa-award text-sm"></i> Credencial Credly
                            </a>
                            <a href="https://coursera.org/share/f18e7e79b6777199d923ec40979bac72" target="_blank" class="w-full bg-[#0056D2] text-white text-xs py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <i class="fas fa-graduation-cap text-sm"></i> Certificado Coursera
                            </a>
                        </div>
                    </div>
                `;
                

            } else {
                // Checa se tem progresso (Google IT Support)
                let isProgress = info.status_geral && info.status_geral.toLowerCase().includes('andamento');
                
                let linkOrProgress = '';
                if (isProgress) {
                    linkOrProgress = `
                        <div class="mt-2 w-full">
                            <div class="flex justify-between text-[9px] sm:text-[10px] text-gray-500 font-semibold mb-1 whitespace-nowrap gap-1">
                                <span class="truncate">Em Andamento</span>
                                <span>1 de 6</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div class="bg-brand dark:bg-brand-neon h-1.5 rounded-full" style="width: 16.66%"></div>
                            </div>
                        </div>
                    `;
                } else {
                    linkOrProgress = `
                        <a href="${verifyUrl}" target="_blank" class="text-xs text-brand dark:text-brand-neon hover:underline font-medium mt-1 inline-flex items-center gap-1">
                            Visualizar <i class="fas fa-external-link-alt text-[10px]"></i>
                        </a>
                    `;
                }

                certsContainer.innerHTML += `
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-dark-border hover-card transition-all w-full">
                        ${badgesHTML}
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-sm text-gray-900 dark:text-white leading-tight truncate" title="${title}">${title}</h3>
                            ${linkOrProgress}
                        </div>
                    </div>
                `;
            }
        });


    }
}

    // Full Drawer Sidebar Toggle Logic
    const topNavToggle = document.getElementById('top-nav-toggle');
    const mainSidebar = document.getElementById('main-sidebar');
    const mainFeed = document.getElementById('main-feed');

    if (topNavToggle && mainSidebar && mainFeed) {
        
        // Initial state (Desktop = expanded, Mobile = hidden)
        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        let isExpanded = isDesktop;

        const drawerOverlay = document.getElementById('drawer-overlay');
        
        function updateSidebarState() {
            if (isExpanded) {
                // Expand
                mainSidebar.classList.remove('drawer-hidden');
                // Removed floatingToggle
                
                // Retorna largura original do feed
                mainFeed.classList.remove('lg:w-full', 'xl:w-full');
                mainFeed.classList.add('lg:w-2/3', 'xl:w-3/4');
                
                // Mostra overlay no mobile
                if (drawerOverlay && !isDesktop) {
                    drawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    drawerOverlay.classList.add('opacity-100', 'pointer-events-auto');
                }
            } else {
                // Hide
                mainSidebar.classList.add('drawer-hidden');
                // Removed floatingToggle
                
                // Expande o feed para 100%
                mainFeed.classList.remove('lg:w-2/3', 'xl:w-3/4');
                mainFeed.classList.add('lg:w-full', 'xl:w-full');
                
                // Esconde overlay no mobile
                if (drawerOverlay) {
                    drawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
                    drawerOverlay.classList.add('opacity-0', 'pointer-events-none');
                }
            }
        }

        // Run on load
        updateSidebarState();



        if (topNavToggle) {
            topNavToggle.addEventListener('click', () => {
                isExpanded = !isExpanded;
                updateSidebarState();
            });
        }

        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', () => {
                if (!isDesktop) {
                    isExpanded = false;
                    updateSidebarState();
                }
            });
        }
    }


function populateSidebarSkills(academic, certs) {
    const skillsContainer = document.getElementById('sidebar-skills');
    if (!skillsContainer) return;

    let googleSkills = new Set();
    let backendSkills = new Set();

    // Extrair do Google AI Cert
    if (certs) {
        certs.forEach(c => {
            if (c.certificacao && c.certificacao.titulo_curso && c.certificacao.titulo_curso.includes('Google AI')) {
                if (c.habilidades_adquiridas) {
                    c.habilidades_adquiridas.forEach(hab => {
                        if (hab.competencias) {
                            hab.competencias.forEach(comp => googleSkills.add(comp));
                        }
                    });
                }
            }
        });
    }

    // Extrair do SCTec Backend Node
    if (academic) {
        academic.forEach(ac => {
            if (ac.curso && ac.curso.includes('Trilha Desenvolvimento de Software')) {
                if (ac.habilidades_principais) {
                    ac.habilidades_principais.forEach(hab => backendSkills.add(hab));
                }
            }
        });
    }

    let skillsHTML = '';

    // Renderizar Google Skills
    if (googleSkills.size > 0) {
        skillsHTML += `<div class="w-full mb-3"><h3 class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Certificado Profissional de Google AI</h3><div class="flex flex-wrap gap-1.5">`;
        Array.from(googleSkills).forEach(skill => {
            skillsHTML += `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-[10px] font-semibold border border-gray-200 dark:border-dark-border skill-tag">${skill}</span>`;
        });
        skillsHTML += `</div></div>`;
    }

    // Renderizar Backend Skills
    if (backendSkills.size > 0) {
        skillsHTML += `<div class="w-full mt-2 mb-1"><h3 class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">SC Tec (Backend Node.js)</h3><div class="flex flex-wrap gap-1.5">`;
        Array.from(backendSkills).forEach(skill => {
            skillsHTML += `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-[10px] font-semibold border border-gray-200 dark:border-dark-border skill-tag">${skill}</span>`;
        });
        skillsHTML += `</div></div>`;
    }

    skillsContainer.innerHTML = skillsHTML;
}
