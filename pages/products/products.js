export function showQueryParameter(match) {
    if (match.params) {
        document.getElementById("selected-product-id").innerText = match.params.id
    }
}