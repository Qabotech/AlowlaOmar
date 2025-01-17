var test = 0;
$(window).on("load", function() {
    // Fetch data from data.json using jQuery's $.getJSON method
    $(document).ready(function() {
        // Fetch data from data.json with a cache-busting query parameter
        $.getJSON('CardData.json', function(cardsData) {
            console.log('Cards data loaded:', cardsData); // Debugging output

            // Check if cardsData is an array and not empty
            if (Array.isArray(cardsData) && cardsData.length > 0) {
                // Loop through the data and create each card
                cardsData.forEach(function(card) {
                    // Create card div
                    var $cardDiv = $('<div class="card"></div>');

                    // Create image element (only if image URL is provided)
                    if (card.image) {
                        var $img = $('<img>').attr('src', card.image).attr('alt', card.alt || '');
                        $cardDiv.append($img);
                    }

                    // Create card content div
                    var $cardContent = $('<div class="card-content"></div>');

                    // Create title (only if title is provided)
                    if (card.title) {
                        var $title = $('<h2></h2>').text(card.title);
                        $cardContent.append($title);
                    }

                    // Create subtitle (only if subtitle is provided)
                    if (card.subtitle) {
                        var $subtitle = $('<h3></h3>').text(card.subtitle);
                        $cardContent.append($subtitle);
                    }

                    // Create description paragraph (only if description is provided)
                    if (card.description) {
                        var $description = $('<p></p>').html(card.description);
                        $cardContent.append($description);
                    }

                    // Create link element (only if link and link_text are provided)
                    if (card.link && card.link_text) {
                        var $link = $('<a></a>').attr('href', card.link).text(card.link_text);
                        $cardContent.append($link);
                    }

                    // Append card content to card div
                    $cardDiv.append($cardContent);

                    // Append the card to the cards container
                    $('#Portfolio .cards').append($cardDiv);
                });
            } else {
                console.error('Invalid or empty cards data:', cardsData);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading data from JSON:', textStatus, errorThrown);
        });
    });

    // Fetch data from textData.json using jQuery's $.getJSON method
    $.getJSON('textData.json?a=' + Math.random(), function(textData) {
        console.log('Text data loaded:', textData); // Debugging output

        // Loop through the data and create each text content element
        textData.forEach(function(item, index) {
            // Create text content div
            var $textContent = $('<div class="text-content"></div>').attr('data-index', index);

            // Create title
            var $title = $('<h1></h1>').text(item.title).css('color', '#999');

            // Create description paragraph
            var $description = $('<p></p>').html(item.description);

            // Append title and description to text content div
            $textContent.append($title, $description);

            // Append the text content to the container
            $('#Portfolio .container').append($textContent);
        });
        $(".loading").remove();
        test = 1;

        if (test == 1) {
            // Dynamically add stylesheets
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './css/style.css?v=' + Math.random();
            document.head.appendChild(link);
            var link1 = document.createElement('link');
            link1.rel = 'stylesheet';
            link1.href = './css/slider.css?v=' + Math.random();
            document.head.appendChild(link1);

            // Carousel effect and click functionality
            const cards = $(".cards .card");
            const textContent = $("#Portfolio .text-content");
            const totalCards = cards.length;
            let currentIndex = 0;

            function updateCards() {
                const angle = window.innerWidth <= 1200 ? 40 : 75;
                const radius = window.innerWidth <= 1200 ? 360 : 300;

                cards.each(function(index) {
                    const card = $(this);
                    const rotateY = (index - currentIndex) * angle;
                    const translateZ = radius;
                    card.attr("data-index", index);

                    card.removeClass('active');
                    if (index === currentIndex) {
                        card.addClass('active');
                    }

                    card.css({
                        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(-50%) translateX(-50%)`,
                        opacity: 1 - Math.abs(index - currentIndex) * 0.4,
                        zIndex: index === currentIndex ? 10 : 1,
                    });
                });

                textContent.each(function(index) {
                    const text = $(this);
                    if (parseInt(text.attr("data-index")) === currentIndex) {
                        text.show().addClass('active');
                    } else {
                        text.hide().removeClass('active');
                    }
                });
            }

            textContent.each(function(index) {
                const text = $(this);
                text.attr("data-index", index);
            });

            $(window).resize(updateCards);
            updateCards();

            // Card click functionality
            $("#Portfolio .card").click(function() {
                if ($(this).hasClass('active')) {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updateCards();
                }
            });

            // Previous button click
            $("#Portfolio #prev").click(function() {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateCards();
            });
        }
        console.log('Script loaded 1');
    }).fail(function() {
        console.error('Error loading data from JSON');
    });
});