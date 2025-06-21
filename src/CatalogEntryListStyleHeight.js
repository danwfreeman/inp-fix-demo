
// current implementation
// reflow during render initialization, which will be extra overhead in React's render cycle.
export class CatalogEntryListStyleHeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.imgHeight = '';
        if (typeof window != 'undefined') {
            if (window.cachedCatalogEntryListStyleHeight) {
                this.state.imgHeight = window.cachedCatalogEntryListStyleHeight;
            } else {
                if (this.props.passedAppFunctions.siteFormat == 'desktop') {
                    this.state.imgHeight = parseFloat((((document.body.clientWidth * 0.8333 - 90) / 3) * 1.16).toFixed(3));
                }
            }
            if (window.cachedCatalogEntryListStyleHeightMobileImg) {
                this.state.mobileImgHeight = window.cachedCatalogEntryListStyleHeightMobileImg;
            } else {
                if (this.props.passedAppFunctions.siteFormat == 'mobile') {
                    this.state.mobileImgHeight = parseFloat((((document.body.clientWidth - 10) / 2) * 1.16).toFixed(3));
                }
            }
        }
        this.updateImgHeight = this.updateImgHeight.bind(this);
    }




// proposed implementation
export class CatalogEntryListStyleHeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: '',
            mobileImgHeight: '',
        };

        this.updateImgHeight = this.updateImgHeight.bind(this);
    }

    componentDidMount() {
        // pull out if initialization routine and defer the work, we wrap in requestAnimationFrame to make sure we start with a 'clean' frame, do ensure we don't have a layout thrash
        requestAnimationFrame(() => {
            if (typeof window !== 'undefined') {
                const { siteFormat } = this.props.passedAppFunctions;

                if (window.cachedCatalogEntryListStyleHeight && siteFormat === 'desktop') {
                    this.setState({ imgHeight: window.cachedCatalogEntryListStyleHeight });
                } else if (siteFormat === 'desktop') {
                    const width = document.body.clientWidth;
                    const imgHeight = parseFloat((((width * 0.8333 - 90) / 3) * 1.16).toFixed(3));
                    window.cachedCatalogEntryListStyleHeight = imgHeight;
                    this.setState({ imgHeight });
                }

                if (window.cachedCatalogEntryListStyleHeightMobileImg && siteFormat === 'mobile') {
                    this.setState({ mobileImgHeight: window.cachedCatalogEntryListStyleHeightMobileImg });
                } else if (siteFormat === 'mobile') {
                    const width = document.body.clientWidth;
                    const mobileImgHeight = parseFloat((((width - 10) / 2) * 1.16).toFixed(3));
                    window.cachedCatalogEntryListStyleHeightMobileImg = mobileImgHeight;
                    this.setState({ mobileImgHeight });
                }
            }
        });
    }

}
