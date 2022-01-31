import React, {useEffect} from 'react'
import * as atlas from 'azure-maps-control';
import Grid from '@mui/material/Grid';
import ContactForm from './contactForm'

export default function AzureMap() {

    useEffect(() => {
        let popup;
        const map = new atlas.Map(document.getElementById('myMap'), {
            center: [21.70, 38.2],
            zoom: 10,
            language: 'en-US',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: '<subscriptionKey>'
            }
        })
        map.events.add('ready', function () {
            let datasource = new atlas.source.DataSource();
            map.sources.add(datasource);

            datasource.add([
                new atlas.data.Feature(new atlas.data.Point([21.72650229798037, 38.225651164033536]), {
                    title: 'Department of Electrical and Computer Engineering (ECE) of the University of Peloponnese',
                    url: 'https://www.ece.uop.gr/',
                    email: 'secretary.ece@uop.gr',
                    imageLink: 'https://www.ece.uop.gr/wp-content/uploads/2020/03/20_ece-uop-logo-high-res-black.jpg'
                })
            ]);

            const layer = new atlas.layer.BubbleLayer(datasource);
            map.layers.add(layer);

            popup = new atlas.Popup();

            map.events.add('click', layer, showPopup);
        });

        function showPopup(e) {
            if (e.shapes && e.shapes.length > 0) {
                const properties = e.shapes[0].getProperties();

                popup.setOptions({
                    content: atlas.PopupTemplate.applyTemplate(properties, properties.popupTemplate),

                    position: e.shapes[0].getCoordinates()
                });

                popup.open(map);
            }
        }
    })

    return (
        <Grid container spacing={2}>
            <Grid item xs={4} md={5}>
                <ContactForm/>
            </Grid>
            <Grid item xs={8} md={7}>
                <div id="myMap" style={{height: "100%", width: "100%"}}></div>
            </Grid>
        </Grid>
    )
}