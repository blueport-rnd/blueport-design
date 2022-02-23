var COM = {};
function CommonClass() {
    var $this = this;


    /************************설정메뉴 관련 End*****************************/

    function dummyDeferred() {
        var def = $.Deferred();
        def.resolve();
        return def.promise();
    };

    function each(arrFunction) {
        var arr = [];
        for (var i = 0; i < arrFunction.length; i++) {
            arr.push(arrFunction[i]());
        }
        return arr;
    };

    function setNewAESKey() {
        console.log('called : start setNewAESKey');
        if (BIT.setup().useClientEncrypt) {
            return BIT.callAjax('/Services/Common/SetNewAESKey.aspx', 'POST', {
            }, function (response) {
                if (response.IsSucceed) {
                    console.log('called : end setNewAESKey');
                }
            });
        } else {
            var deferred = $.Deferred();
            deferred.resolve();
            console.log('called : end setNewAESKey');
            return deferred.promise();
        }
    };

    this.openJusoPopup = function ($selectedAddressArea, callback) {
        var options = {
            url: '/Popup/Juso.aspx',
            width: 570,
            height: 420,
            okCallback: null,
            closeCallback: closeCallback,
            cancelCallabck: null,
            title: '주소 검색',
            data: {},
            modal: true
        };
        var $dialog = BIT.modalDialog(options);
        function closeCallback($container) {
            var data = $container.data('data');
            if ($selectedAddressArea != null && data != null) {
                $selectedAddressArea.find('[name=Address]').val(data.roadAddrPart1);
                $selectedAddressArea.find('[name=ZipCode]').val(data.zipNo);
                $selectedAddressArea.find('[name=Address]').focus();
            }
            if (data != null && callback != null) {
                callback(data);
            }
        }
    };

    this.openAddPartnerClerkPopup = function () {
        var options = {
            url: '/Popup/AddPartnerClerk.aspx',
            width: 790,
            height: 640,
            closeCallback: closeCallback,
            title: '파트너 담당자 추가',
            data: {},
            modal: true,
            cancelButton: null, //selector
            okButton: null      //selector
        };
        var $dialog = BIT.modalDialog(options);
        function closeCallback($container) {
            var data = $container.data('data');

            if (data != null && data.IsSucceed) {
                BIT.callFunction('loadManagePartnerClerk');
            }
        };
    };

    this.openModifyPartnerClerkPopup = function (data) {
        var options = {
            iframe: false,
            url: '/Popup/ModifyPartnerClerk.aspx',
            width: 790,
            height: 640,
            closeCallback: closeCallback,
            title: '파트너 담당자 수정',
            data: data,
            modal: true
        };

        BIT.modalDialog(options);

        function closeCallback($container) {
            var data = $container.data('data');

            if (data != null && data.IsSucceed) {
                BIT.callFunction('loadManagePartnerClerk');
            }
        };
    };

    // 전체특별여신목록
    this.openPartnerCreditPopup = function (data) {
        var options = {
            iframe: false,
            url: '/Popup/PopupPartnerCreditList.aspx',
            width: 740,
            height: 460,
            title: '전체 특별여신 목록',
            data: data,
            modal: true
        };

        BIT.modalDialog(options);
    };

    this.openFileUploadPopup = function (data, closeCallback) {
        var options = {
            iframe: true,
            url: '/Popup/FileUpload.aspx',
            width: 700,
            height: 420,
            title: '파일 업로드',
            data: data,
            closeCallback: closeCallback
        };
        var $container = BIT.modalDialog(options);
    };

    // 고객 검색 팝업
    this.openSearchCustomerPopup = function (data, closeCallback) {
        var options = {
            url: '/Popup/PopupCustomerSearch.aspx',
            width: 1000,
            height: 590,
            closeCallback: closeCallback,
            title: '고객검색',
            data: data,
            modal: true
        };

        var $dialog = BIT.modalDialog(options);
    };

    // 고객 검색 팝업(파트너 전용)
    this.openSearchCustomerPopupForPartner = function (data, closeCallback) {
        var options = {
            url: '/Popup/CustomerSearchForPartner.aspx',
            width: 600,
            height: 400,
            closeCallback: closeCallback,
            title: '고객검색',
            data: data,
            modal: true
        };

        var $dialog = BIT.modalDialog(options);
    };

    this.openSearchPartnerPopup = function (data, closeCallback) {
        var options = {
            url: '/Popup/PopupPartnerSearch.aspx',
            width: 750,
            height: 600,
            closeCallback: closeCallback,
            title: '파트너검색',
            data: data,
            modal: true,
            cancelButton: null, //selector
            okButton: null      //selector
        };

        var $dialog = BIT.modalDialog(options);
    };

    this.openSearchPartnerLevelPopup = function (data, closeCallback) {
        var options = {
            url: '/Popup/PopupPartnerLevelSearch.aspx',
            width: 750,
            height: 540,
            closeCallback: closeCallback,
            title: '파트너검색',
            data: data,
            modal: true,
            cancelButton: null, //selector
            okButton: null      //selector
        };

        var $dialog = BIT.modalDialog(options);
    };

    this.openSelectProductPopup = function (callback, data) {
        var options = {
            iframe: false,
            url: '/Popup/PopupProductSelect.aspx',
            width: 900,
            data: data,
            height: 780,
            closeCallback: closeCallback,
            title: '제품 선택'
        };

        var $dialog = BIT.modalDialog(options);

        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openSelectProductForPartnerPopup = function (callback, data) {
        var options = {
            iframe: false,
            url: '/Popup/ProductSelectForPartner.aspx',
            width: 700,
            data: data,
            height: 450,
            closeCallback: closeCallback,
            title: '제품 선택'
        };

        var $dialog = BIT.modalDialog(options);

        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openProductInfoPopup = function (title, data) {
        var options = {
            iframe: false,
            url: '/Popup/PopupProductAdd.aspx',
            width: 900,
            height: 730,
            data: data,
            title: title
        };
        var $container = BIT.modalDialog(options);
    };

    // 제품상세정보 등록
    this.openProductDetailAddPopup = function (title, data, callback) {
        var options = {
            iframe: false,
            url: '/Popup/PopupProductDetailAdd.aspx',
            width: 800,
            height: 600,
            data: data,
            title: title,
            closeCallback: closeCallback,
        };

        var $container = BIT.modalDialog(options);

        function closeCallback($container) {
            $('input').focus();
            callback($container.data('data'));
        };
    };

    // 제품상세정보 보기
    this.openProductDetailViewPopup = function (title, data) {
        var options = {
            iframe: false,
            url: '/Popup/PopupProductDetailView.aspx',
            width: 740,
            height: 470,
            data: data,
            title: title,
        };

        var $container = BIT.modalDialog(options);
    };

    this.openAddCustomerClerkPopup = function (customerPid, callback) {
        var options = {
            iframe: false,
            url: '/Popup/AddCustomerClerkPopup.aspx',
            width: 900,
            height: 395,
            data: { CustomerPid: customerPid },
            closeCallback: closeCallback,
            title: '담당자 추가'
        };
        var $container = BIT.modalDialog(options);
        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openAddBlueportClerkPopup = function (callback) {
        var title = '사용자 등록';
        var options = {
            iframe: false,
            url: '/Popup/AddBlueportClerkPopup.aspx',
            width: 745,
            height: 700,
            closeCallback: closeCallback,
            title: title
        };
        var $container = BIT.modalDialog(options);
        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openEditBlueportClerkPopup = function (userPid, callback) {
        var title = '사용자 수정';
        var options = {
            iframe: false,
            url: '/Popup/EditBlueportClerkPopup.aspx',
            width: 745,
            height: 700,
            data: { UserPid: userPid },
            closeCallback: closeCallback,
            title: title
        };
        var $container = BIT.modalDialog(options);
        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openVendorPopup = function (modeType, vendorPid) {
        var title = '벤더 등록';
        if (modeType == 'edit') {
            title = '벤더 수정';
        }
        var options = {
            iframe: false,
            url: '/Popup/VendorPopup.aspx',
            width: 745,
            height: 265,
            data: { VendorPid: vendorPid },
            modeType: modeType,
            title: title
        };
        var $container = BIT.modalDialog(options);
    };

    // 판매 대상 벤터 검색
    this.openVendorSearchPopup = function (title, data, callback) {
        var options = {
            iframe: false,
            url: '/Popup/PopupVendorSearch.aspx',
            width: 740,
            height: 500,
            data: data,
            closeCallback: closeCallback,
            title: title
        };

        var $container = BIT.modalDialog(options);

        function closeCallback($container) {
            callback($container.data('data'));
        };
    };

    this.openMemoPopup = function (memoType, pid, closeCallback) {
        if (memoType == 'order') {
            var options = {
                iframe: false,
                url: '/Popup/OrderMemoPopup.aspx',
                width: 720,
                height: 280,
                closeCallback: closeCallback,
                title: '주문 특이 사항',
                data: { MemoType: memoType, Pid: pid }
            };
            var $container = BIT.modalDialog(options);
        } else {
            var options = {
                iframe: false,
                url: '/Popup/CommonMemoPopup.aspx',
                width: 720,
                height: 200,
                title: '비고',
                closeCallback: closeCallback,
                data: { MemoType: memoType, Pid: pid }
            };
            var $container = BIT.modalDialog(options);
        }
        return;
    };

    this.openCancelOrderPopup = function (data, callback) {
        var options = {
            iframe: false,
            url: '/Popup/PopupOrderCancel.aspx',
            width: 745,
            height: 265,
            data: data,
            title: "발주취소"
        };
        var $container = BIT.modalDialog(options);
    };

    this.openPurchaseProductPopup = function (orderPid, callback) {
        var options = {
            iframe: false,
            url: '/Popup/PopupPurchaseProduct.aspx',
            width: 760,
            height: 360,
            data: { OrderPid: orderPid },
            title: "매입관리"
        };

        var $container = BIT.modalDialog(options);
    };

    this.openAddPartnerRequestPopup = function (data, callback) {
        var options = {
            iframe: false,
            url: '/Popup/AddPartnerRequestPopup.aspx',
            width: 745,
            height: 185,
            data: data,
            title: '파트너 등록 요청'
        };
        var $container = BIT.modalDialog(options);
    };

    this.openPurchasePopup = function (purchaseBasisModel, callback) {
        var options = {
            iframe: false,
            url: '/Popup/PopupPurchase.aspx',
            width: 760,
            height: 600,
            data: purchaseBasisModel,
            closeCallback: closeCallback,
            title: "매입처 선택"
        };

        var $dialog = BIT.modalDialog(options);

        function closeCallback($container) {
            callback($container.data('data'));
        };

        //var $container = BIT.modalDialog(options);

        //function closeCallback($container) {
        //    callback($container.data('data'));
        //};
    };

    //this.uploadSingleFile = function ($selector, formData, acceptFileType, fileSize, callback) {
    //    if ($selector.length > 0) {
    //        for (var i = 0; i < $selector.length; i++) {
    //            $selector.eq(i).fileupload({
    //                url: '/Services/Common/UploadFiles.aspx?ModelType=Models.FileInfoModel',
    //                formData: formData,
    //                uploadTemplateId: null,
    //                downloadTemplateId: null,
    //                add: function (e, data) {
    //                    var uploadErrors = [];
    //                    var acceptFileTypes = acceptFileType;
    //                    if (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
    //                        uploadErrors.push('허용되지 않는 파일입니다.');
    //                    }
    //                    else if (data.originalFiles[0]['type'] == '' && !acceptFileTypes.test(data.originalFiles[0]['name'].split('.')[1])) {
    //                        uploadErrors.push('허용되지 않는 파일입니다.');
    //                    }
    //                    if (data.originalFiles[0]['size'] && data.originalFiles[0]['size'] > fileSize) {
    //                        uploadErrors.push('파일 크기가 너무 큽니다.');
    //                    }
    //                    if (uploadErrors.length > 0) {
    //                        BIT.modal(uploadErrors.join("\n"));
    //                    } else {
    //                        data.submit();
    //                    }
    //                },
    //                dataType: 'json',
    //                autoUpload: true,
    //                done: function (e, data) {
    //                    var response = data.result;
    //                    callback(response.Data[0], $(e.target));
    //                }
    //            });
    //        }
    //    }
    //};

    this.uploadSingleFile = function ($selector, formData, acceptFileType, fileSize, callback) {
        BIT.uploadSingleFile($selector, '/Services/Common/UploadFiles.aspx?ModelType=Models.FileInfoModel', formData, acceptFileType, fileSize, callback);
    };

    this.replaceComma = function (obj) {
        $.each(obj, function (name, value) {
            try {
                if (typeof (obj[name]) == 'object') {
                    $this.replaceComma(obj[name]);
                } else {
                    if (obj[name] != null) {
                        var t = obj[name].toString().replace(/,/g, '');
                        if (!isNaN(parseFloat(t))) {
                            obj[name] = t;
                        }
                    }
                }
            } catch (ex) {
                alert(ex);
            }

        });
    };

    // 숫자 -> 한글 금액
    this.ConvertToCurrencyKr = function (num) {
        var hanA = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
        var danA = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천");

        var result = "";
        for (i = 0; i < num.length; i++) {
            str = "";
            han = hanA[num.charAt(num.length - (i + 1))];
            if (han != "") {
                str += han + danA[i];
            }

            if (i == 4) str += "만";
            if (i == 8) str += "억";
            if (i == 12) str += "조";
            result = str + result;
        }
        if (num != 0) {
            result = result + "원";
        }

        return result;
    }

    this.openLicensePopup = function (orderPid, orderProductPid) {
        var options = {
            iframe: false,
            url: '/Popup/AddLicenseInfoPopup.aspx',
            width: 745,
            height: 445,
            title: "라이선스 관리",
            data: { OrderPid: orderPid, OrderProductPid: orderProductPid }
        };
        var $container = BIT.modalDialog(options);
    };

    this.addViewerEventHandler = function () {
        //BPADMIN-50
        $('.partnerinfomr').css('cursor', 'pointer');
        $('.partnerinfomr').click(function (e) {
            e.stopPropagation();
            if ($(this).data('partnerpid') > 0) {
                var options = {
                    iframe: false,
                    url: '/Popup/PartnerInfoPopupForMR.aspx',
                    width: 900,
                    height: 540,
                    title: '파트너 정보',
                    data: { PartnerPid: $(this).data('partnerpid') }
                };
                var $container = BIT.modalDialog(options);
            }
        });
        $('.partnerinfo').css('cursor', 'pointer');
        $('.partnerinfo').click(function (e) {
            e.stopPropagation();
            if ($(this).data('partnerpid') > 0) {
                var options = {
                    iframe: false,
                    url: '/Popup/PartnerInfoPopup.aspx',
                    width: 900,
                    height: 660,
                    title: '파트너 정보',
                    data: { PartnerPid: $(this).data('partnerpid') }
                };
                var $container = BIT.modalDialog(options);
            }
        });
        $('.customerinfo').css('cursor', 'pointer');
        $('.customerinfo').click(function (e) {
            e.stopPropagation();
            if ($(this).data('customerpid') > 0) {
                var options = {
                    iframe: false,
                    url: '/Popup/CustomerInfoPopup.aspx',
                    width: 800,
                    height: 600,
                    title: '고객 정보',
                    data: { CustomerPid: $(this).data('customerpid') }
                };
                var $container = BIT.modalDialog(options);
            }
        });
        $('.purchaseCompanyinfo').css('cursor', 'pointer');
        $('.purchaseCompanyinfo').click(function (e) {
            e.stopPropagation();
            if ($(this).data('purchasecompanypid') > 0) {
                var options = {
                    iframe: false,
                    url: '/Popup/PurchaseCompanyInfoPopup.aspx',
                    width: 800,
                    height: 770,
                    title: '매입처 정보',
                    data: { PurchaseCompanyId: $(this).data('purchasecompanypid') }
                };
                var $container = BIT.modalDialog(options);
            }
        });
        $('.licenseInfo').css('cursor', 'pointer');
        $('.licenseInfo').click(function (e) {
            e.stopPropagation();
            if ($(this).data('orderpid') > 0 && $(this).data('orderproductpid') > 0) {
                var options = {
                    iframe: false,
                    url: '/Popup/AddLicenseInfoPopup.aspx',
                    width: 745,
                    height: 445,
                    title: "라이선스 관리",
                    data: { OrderPid: $(this).data('orderpid'), OrderProductPid: $(this).data('orderproductpid') }
                };
                var $container = BIT.modalDialog(options);
            }
        });
        $('.purchase').css('cursor', 'pointer');
        $('.purchase').click(function (e) {
            e.stopPropagation();

            switch ($(this).data('searchtype')) {
                case 1:
                case 2:
                case 3:
                    window.open('/Blueport/OrderList/StepAll.aspx?SearchType=' + $(this).data('searchtype') + "&SearchText=" + escape($(this).data('searchtext')));
                    break;
                case 4:
                    window.open('/Blueport/OrderList/PurchaseList.aspx?SearchType=' + $(this).data('searchtype') + "&SearchText=" + escape($(this).data('searchtext')));
                    break;
            }
        });
    };

    /*
     * paging 공통
     * jquery.paging.js 사용
     *
     *   var option =
     *       {
     *           format: "[< nncnn>]",
     *           perpage: pageSize,
     *           lapping: 0,
     *           page: response.page,
     *           onSelect: function (page) {
     *               if (page != response.page)
     *                   drugSearch(page);
     *           },
     *       };
     *
     * COM.pager($("#pagination"), response.records, option);
     * $target = 페이징이 들어가는 target , records = list total count 
     * onSelect 는 페이지 선택시 호출되며, 페이징 완료후에도 호출되므로 if 처리를 해준다.
     * perpage = 한페이지의 리스트 갯수, page = 현재 페이지
     * 
    */
    this.pager = function ($target, records, options) {
        var defaults =
            {
                format: "[< nncnnnnnnn >]",
                perpage: 10,
                lapping: 0,
                page: 1,
                onSelect: function (page) {
                },
                onFormat: function (type) {
                    switch (type) {
                        case 'block':
                            if (this.value != this.page) {
                                return '<li><a href="javascript:;">' + this.value + '</a></li>&nbsp;';
                            } else {
                                return '<li><a href="javascript:;" class="pageOn">' + this.value + '</a></li>&nbsp;';
                            }
                        case 'next':
                            return '</ul><a href="javascript:;" class="pageArr2"><img src="/Images/admin/page_next.png" alt="다음"></a>&nbsp;';
                        case 'prev':
                            return '<a href="javascript:;" class="pageArr1"><img src="/Images/admin/page_pre.png" alt="이전" /></a><ul>';
                        case 'first':
                            return '<a href="javascript:;" class="pageArr1"><img src="/Images/admin/page_first.png" alt="맨처음" /></a>&nbsp;';
                        case 'last':
                            return '<a href="javascript:;" class="pageArr2"><img src="/Images/admin/page_last.png" alt="맨마지막"></a>&nbsp;';
                            //case 'block':
                            //    if (this.value != this.page)
                            //        return '<span class="pageNum"><a> ' + this.value + '</a></span>';
                            //    return '<span class="pageNum"><a class="on">' + this.value + '</a></span>';
                            //case 'next':
                            //    return '<span class="next-box"><a class="next">이후</a></span>';
                            //case 'prev':
                            //    return '<span class="prev-box"><a class="prev">이전</a></span>';
                            //case 'first':
                            //    return '<span class="dprev-box"><a class="db-prev">처음으로</a></span>';
                            //case 'last':
                            //    return '<span class="dnext-box"><a class="db-next">마지막으로</a></span>';
                    }
                }
            }
        var opts = $.extend({}, defaults, options);
        $target.paging(records, opts);
    };

    this.orderStep = function (step) {
        if (step.toLowerCase() == 'all') {
            $('#divStepList a:last').addClass('complete');
        } else {
            $('#divStepList a').each(function (i) {
                if (i < step) {
                    $(this).addClass('complete');
                }
            });
        }
    }
};
this.COM = new CommonClass();

var selectDay = null;
var selectGridRow = null;

BIT.setup({
    errorViewType: 'tooltip',  // 'tooltip' 혹은 'alert'
    useClientEncrypt: false,  //클라이언트 암호화를 사용 할 것인가?
    useServerEncrypt: false
});

$(function () {
    // 뒤로가기 방지 스크립트
    //history.pushState(null, null, location.href);
    //window.onpopstate = function (event) {
    //    history.go(1);
    //};

    COM.addViewerEventHandler();

    // 주소
    $('.addressButton').click(function (e) {
        e.preventDefault();
        var $selectedAddressArea = $(this).closest('.address');
        COM.openJusoPopup($selectedAddressArea);
    });

    var cal = function () {
        $('.input_cal').datepicker({
            onSelect: function (text, obj) {
                if (selectDay != null) {
                    selectDay(text, obj);
                }

                $(this).change();
            },
            beforeShow: function () {
                showPrevNextYearButton($(this));
            },
            onChangeMonthYear: function () {
                showPrevNextYearButton($(this));
            }
        });
    };

    // 달력
    $('body').on('click focusin', '.input_cal', function () {
        cal();
        $(this).datepicker('show');
    });

    $('body').on('keyup', '.input_cal', function (e) {
        e.stopImmediatePropagation();
        var date = BIT.convertToDate($(this).val());
        if (date != null) {
            showPrevNextYearButton($(this));
        }
    });

    // 달력
    function showPrevNextYearButton($input) {
        setTimeout(function () {
            var header = $input.datepicker('widget').find('.ui-datepicker-header');
            var $prevButton = $('<a title="' + BIT.messages.datepicker_prev_year + '" class="ui-datepicker-prevYear ui-corner-all" ><span>' + BIT.messages.datepicker_prev_year + '</span></a>');
            header.find('a.ui-datepicker-prev').before($prevButton);
            $prevButton.unbind("click").bind("click", function () {
                $.datepicker._adjustDate($input, -1, 'Y');
            });

            var $nextButton = $('<a title="' + BIT.messages.datepicker_next_year + '" class="ui-datepicker-nextYear ui-corner-all" ><span>' + BIT.messages.datepicker_next_year + '</span></a>');
            header.find('a.ui-datepicker-next').after($nextButton);
            $nextButton.unbind("click").bind("click", function () {
                $.datepicker._adjustDate($input, +1, 'Y');
            });
        }, 1);
    };
});