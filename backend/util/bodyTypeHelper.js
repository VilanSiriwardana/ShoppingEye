

function determineBodyType({ bust, waist, hip}) {
    let bodyType = '';

    console.log("Bust:",bust , "Waist:", waist, "Hip:",hip);

    // Calculate ratios
    const waistToBustRatio = waist / bust;
    const waistToHipRatio = waist / hip;
    const hipToBustRatio = hip / bust;

    // Step 1: Waist Definition
    if (waist < bust && waist < hip) {
        // Step 2: Bust and Hip Proportions
        if (Math.abs(bust - hip) <= 0.05 * bust) {
            bodyType = 'Hourglass';
        } else {
            // Step 4: Hip and Bust Comparison
            if (hip > bust) {
                bodyType = 'Pear';
            } else {
                bodyType = 'Inverted Triangle';
            }
        }
    } else {
        // Step 3: Waist Width Comparison
        if (waist > bust || waist > hip) {
            if (waist > bust && waist > hip) {
                bodyType = 'Apple';
            } else {
                bodyType = 'Diamond';
            }
        } else {
            // Waist similar to bust and hip
            if (Math.abs(waist - bust) <= 0.05 * waist && Math.abs(waist - hip) <= 0.05 * waist) {
                bodyType = 'Rectangle';
            } else {
                // Step 4: Hip and Bust Comparison
                if (hip > bust) {
                    bodyType = 'Pear';
                } else {
                    bodyType = 'Inverted Triangle';
                }
            }
        }
    }

    // Step 5: Midsection Evaluation (Applicable for Apple and Diamond)
    if ((waist > bust) && (waist > hip)) {
        if (bust < hip) {
            bodyType = 'Diamond';
        } else {
            bodyType = 'Apple';
        }
    }

    // Step 6: Confirmation (Not implemented, as it requires user feedback)

    return bodyType;
}



// // Example measurements to test the code
// const examples = [
//     { bust: 38, waist: 34, hip: 38 }, // Expected: Hourglass
//     { bust: 38, waist: 34, hip: 42 }, // Expected: Pear
//     { bust: 42, waist: 34, hip: 38 }, // Expected: Inverted Triangle
//     { bust: 36, waist: 38, hip: 36 }, // Expected: Apple
//     { bust: 36, waist: 38, hip: 40 }, // Expected: Diamond
//     { bust: 38, waist: 38, hip: 38 }  // Expected: Rectangle
// ];

// examples.forEach((example, index) => {
//     console.log(`Example ${index + 1}:`, determineBodyType(example.bust, example.waist, example.hip));
// });


module.exports = { determineBodyType };